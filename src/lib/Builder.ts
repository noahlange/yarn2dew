import type { BuilderOutput, I18N } from '../types';
import { getContentPatch } from '../utils';
import { ScopeType, type Scope } from './Compiler';

export class Builder {
  public emit(): BuilderOutput {
    const targets = Object.groupBy(
      Object.values(this.frames)
        .filter(f => f.type !== ScopeType.NONE && f.content.length)
        .map(value => ({ ...value, target: this.options.target, key: this.getEventKey(value) }))
        .filter(f => f.target),
      e => e.target!
    );

    const content = getContentPatch(
      Object.entries(targets).map(([target, entries]) => ({
        Action: 'EditData',
        Target: target,
        Entries: entries!.reduce(
          (a, { key, content }) =>
            Object.assign(a, {
              [key]: content.join('/')
            }),
          {}
        )
      }))
    );

    return {
      content,
      filename: this.options.filename,
      i18n: Object.entries(this.i18n).reduce(
        (a, [key, value]) => ({
          ...a,
          [`${this.options.namespace}.${key}`]: value
        }),
        {} as I18N
      )
    };
  }

  private getEventKey(content: Scope) {
    const reqs = content.decls
      .filter(({ key }) => key !== 'music' && !key.startsWith('start'))
      .map(({ key, value }) => `${key} ${value}`)
      .join('/');

    return reqs
      ? `${this.options.namespace}.${content.name}/${reqs}`
      : `${this.options.namespace}.${content.name}`;
  }

  public constructor(
    private frames: Scope[],
    private i18n: Record<string, string>,
    private options: BuilderOptions
  ) {}
}

interface BuilderOptions {
  namespace: string;
  target: string;
  source?: string;
  filename?: string;
}
