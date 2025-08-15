import { watch } from 'fs/promises';
import type { BuilderOutput, ContentPatcherManifest, IncludeChange } from '../types';
import { Patcher } from './Patcher';
import { join, normalize, resolve } from 'path';
import { getContent } from '../utils';

export class YarnToDew {
  private patcher = new Patcher();
  private selfChanges: Set<string> = new Set();
  private blacklist = new Set(['content.json', 'manifest.json']);
  private namespace!: string;

  public async process(filename: string): Promise<void> {
    const res = await new Promise<BuilderOutput>((resolve, reject) => {
      const w = new Worker(new URL('./Worker.ts', import.meta.url));
      w.postMessage({ namespace: this.namespace, filename });
      w.addEventListener('message', (e: MessageEvent<BuilderOutput>) => resolve(e.data));
      w.addEventListener('error', reject);
    });
    this.patcher.add(res.filename ?? 'content.json', res.content);
    this.patcher.add('i18n/default.json', res.i18n);
  }

  public load(file: string, content: string) {
    if (file.endsWith('.json') && !file.endsWith('.sls.json')) {
      this.patcher.add(file, JSON.parse(content));
    }
  }

  private async reads() {
    const watcher = watch(this.directory, { recursive: true });
    for await (const event of watcher) {
      const normalized = normalize(event.filename!).toLowerCase();
      if (!normalized.endsWith('.yarn')) continue;
      if (this.selfChanges.has(normalized)) {
        this.selfChanges.delete(normalized);
      } else if (!this.blacklist.has(normalized)) {
        console.log(`🧶 detected ${event.eventType} in "${event.filename}"`);
        this.process(await Bun.file(join(this.directory, event.filename!)).text());
      }
    }
  }

  private async writes() {
    for await (const [filename, data] of this.patcher.patches()) {
      console.log(`\t ✅ updated ${filename}`);
      this.selfChanges.add(normalize(filename).toLowerCase());
      await Bun.write(filename, JSON.stringify(data, null, 2));
    }
  }

  public async start() {
    await this.preload();
    console.log(`watching mod ${this.namespace} for changes`);
    await Promise.all([this.writes(), this.reads()]);
  }

  private async preload() {
    const { Changes = [] } = await getContent(this.directory);
    await Promise.all(
      Changes.filter((c): c is IncludeChange => c.Action === 'Include')
        .flatMap(c => c.FromFile.split(','))
        .map(async filename => {
          const file = Bun.file(resolve(process.cwd(), filename));
          this.load(filename, await file.text());
        })
    );
  }

  constructor(
    public manifest: ContentPatcherManifest,
    public directory: string
  ) {
    this.namespace = manifest.UniqueID;
  }
}
