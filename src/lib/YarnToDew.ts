import { watch } from 'fs/promises';
import type { BuilderOutput } from '../types';
import { Patcher } from './Patcher';
import { readdir } from 'fs/promises';
import { join, resolve } from 'path';
import { getModId } from '../utils';

export class YarnToDew {
  private patcher = new Patcher();
  private selfChanges: Set<string> = new Set();

  public async process(name: string, source: string): Promise<void> {
    const res = await new Promise<BuilderOutput>((resolve, reject) => {
      const w = new Worker(new URL('./Worker.ts', import.meta.url));
      w.postMessage({ name, source });
      w.addEventListener('message', (e: MessageEvent<BuilderOutput>) => resolve(e.data));
      w.addEventListener('error', reject);
    });
    this.patcher.add(res.source ?? 'content.json', res.content);
    this.patcher.add('i18n/default.json', res.i18n);
  }

  public load(file: string, content: string) {
    if (file.endsWith('.json')) {
      this.patcher.load(file, JSON.parse(content));
    }
  }

  private async reads() {
    const watcher = watch(this.directory, { recursive: true });
    for await (const event of watcher) {
      if (this.selfChanges.has(event.filename!)) {
        this.selfChanges.delete(event.filename!);
      } else {
        console.log(`🧶 detected ${event.eventType} in "${event.filename}"`);
        const text = await Bun.file(join(this.directory, event.filename!)).text();
        this.process(event.filename!, text);
      }
    }
  }

  private async writes() {
    for await (const [filename, data] of this.patcher.patches()) {
      this.selfChanges.add(filename);
      console.log(`\t ✅ updated ${filename}`);
      await Bun.write(filename, JSON.stringify(data));
    }
  }

  public async start() {
    await this.preload();
    const id = await getModId(this.directory);
    console.log(`watching mod ${id} for changes`);
    await Promise.all([this.writes(), this.reads()]);
  }

  private async preload() {
    const files = await readdir(process.cwd(), { recursive: true });
    await Promise.all(
      files
        .filter(f => f.endsWith('.json') || f.endsWith('.yarn'))
        .map(async filename => {
          const file = Bun.file(resolve(process.cwd(), filename));
          this.load(filename, await file.text());
        })
    );
  }

  constructor(public directory: string) {}
}
