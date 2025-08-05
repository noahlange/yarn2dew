import type { I18N } from '../types';
import { getContentPatch } from '../utils';
import { ScopeType, type Scope } from './Compiler';

export class Builder {
  public emit() {
    const targets = Object.groupBy(
      Object.values(this.frames)
        .filter(f => f.type !== ScopeType.NONE)
        .filter(f => f.content.length)
        .map(value => ({ ...value, ...this.getTarget(value) }))
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
      'content.json': content,
      'i18n/default.json': Object.entries(this.i18n).reduce(
        (a, [key, value]) => ({
          ...a,
          [`${this.namespace}.${key}`]: value
        }),
        {} as I18N
      )
    };
  }

  private getTarget(content: Scope) {
    const location = content.state[ScopeType.MAP];
    const npc = content.state[ScopeType.NPC];
    const event = content.state[ScopeType.EVENT];
    if (location) {
      return {
        target: `Data/Events/${location}`,
        key: this.getEventKey(content)
      };
    } else if (npc) {
      return {
        target: `Characters/Dialogue/${npc}`,
        key: `${this.namespace}.${content.name}`
      };
    } else {
      console.log(content);
      throw new Error('Could not resolve target for content');
    }
  }

  private getEventKey(content: Scope) {
    const prereq = Object.entries(content.prereq)
      .map(([k, v]) => `${k} ${v}`)
      .join('/');

    return prereq ? `${this.namespace}.${content.name}/${prereq}` : `${this.namespace}.${content.name}`;
  }

  public constructor(
    private namespace: string,
    private frames: Scope[],
    private i18n: Record<string, string>
  ) {}
}
