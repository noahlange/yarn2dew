import type { Builder } from './Builder';
import type { ChangeEntry, ContentJSON } from '../types';

export class Patcher {
  private data: ReturnType<typeof this.builder.emit>;

  private mergeChanges(prev: ContentJSON, data: ContentJSON) {
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

  public patch(file: string, json: object): string {
    switch (true) {
      case file.includes('i18n'): {
        return JSON.stringify(Object.assign(json, this.data['i18n/default.json']));
      }
      default: {
        return JSON.stringify(this.mergeChanges(json as ContentJSON, this.data['content.json']));
      }
    }
  }

  constructor(public builder: Builder) {
    this.data = builder.emit();
  }
}
