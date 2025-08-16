import type { ChangeEntry, ContentJSON, I18N } from '../types';

type Change = [string, I18N] | [string, ContentJSON];

export class Patcher {
  private updates: Set<string> = new Set();
  private files: Record<string, I18N | ContentJSON> = {};

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

  public async add(file: string, data: ContentJSON | I18N): Promise<void> {
    const curr = await Bun.file(file).json();
    const next = file.includes('i18n')
      ? Object.assign(curr, data)
      : this.mergeChanges(curr as ContentJSON, data as ContentJSON);

    if (file.endsWith('content.json')) {
      Object.assign(next, { Format: '2.7.0' });
    }

    // if (next != curr) {
    this.files[file] = next;
    this.updates.add(file);
    // }
  }

  public async *patches(): AsyncIterable<Change> {
    while (true) {
      await new Promise(resolve => setTimeout(resolve, 250));
      for (const file of this.updates) {
        yield [file, this.files[file]] as Change;
        delete this.files[file];
      }
      this.updates.clear();
    }
  }
}
