import type { ChangeEntry, ContentJSON, I18N } from '../types';

type Change = ['i18n/default.json', I18N] | [string, ContentJSON];

export class Patcher {
  private updates: Set<string> = new Set();
  private files: Record<string, I18N | ContentJSON> = {};

  public has(file: string): boolean {
    return file in this.files;
  }

  private mergeChanges(prev: ContentJSON, data: ContentJSON) {
    if (!prev) return data;
    const prevChanges = prev.Changes ?? [];
    const currChanges = data.Changes ?? [];
    const changes = Object.groupBy(
      [...prevChanges, ...currChanges] as ChangeEntry[],
      entry => `${entry.Action}:${entry.Target}`
    );
    return {
      ...data,
      Changes: Object.values(changes).map(toMerge =>
        toMerge!.reduce((a: ChangeEntry, b: object) => ({ ...a, ...b }), {} as ChangeEntry)
      )
    };
  }

  public load(file: string, data: ContentJSON | I18N) {
    const curr = this.files[file] ?? {};
    if (file.endsWith('i18n/default.json')) {
      this.files[file] = Object.assign(curr, data);
    } else {
      this.files[file] = this.mergeChanges(curr as ContentJSON, data as ContentJSON);
    }
  }

  public add(file: string, data: ContentJSON | I18N): void {
    this.load(file, data);
    this.updates.add(file);
  }

  public async *patches(): AsyncIterable<Change> {
    while (true) {
      await new Promise(resolve => setTimeout(resolve, 250));
      for (const file of this.updates) {
        const data = this.files[file];
        if (file === 'i18n') {
          yield ['i18n/default.json', data as I18N];
        } else {
          yield [file, data as ContentJSON];
        }
      }
      this.updates.clear();
    }
  }
}
