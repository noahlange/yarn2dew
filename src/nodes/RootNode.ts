import { Node } from './Node';

import { Compiler, type State } from '../lib';
import { type AnyNode, CommandNode, type DocumentMeta } from '.';

export class RootNode extends Node {
  private getViewportStart(): string {
    return this.meta.start
      ? this.meta.start
          .split(',')
          .map(v => v.trim())
          .join(' ')
      : '0 0';
  }

  private getMusic() {
    if (this.meta.music) {
      return this.meta.music;
    }
    return 'continue';
  }

  private addEventPrelude($: Compiler) {
    if (this.meta.entry) {
      const buffer = $.getBuffer();
      buffer.unshift(this.getMusic(), this.getViewportStart()!);
    }
  }

  private addEventPause() {
    if (!this.meta.entry) {
      this.children.unshift(new CommandNode('pause', ['1']));
    }
  }

  public compile($: Compiler, state: State) {
    $.useScope(this.meta.title, () => {
      this.addEventPause();
      for (const node of this.children) {
        node.compile($, state);
      }
      this.addEventPrelude($);
    });
  }

  constructor(
    public children: AnyNode[],
    public meta: DocumentMeta
  ) {
    super();
  }
}
