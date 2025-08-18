import { Node } from './Node';

import { Compiler, type State } from '../lib';
import { type AnyNode, CommandNode, type DocumentMeta } from '.';

export class RootNode extends Node {
  private getViewportPosition() {
    let split = this.meta.start.split(',');
    if (split.length <= 1) {
      split = this.meta.start.split(' ');
    }
    if (split.length >= 2) {
      const [x, y] = split.map(p => p.trim());
      return {
        x: parseInt(x),
        y: parseInt(y)
      };
    }
    return { x: 0, y: 0 };
  }

  private getStart() {
    const { x, y } = this.getViewportPosition();
    return `${x} ${y}`;
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
      buffer.unshift(this.getMusic(), this.getStart());
    }
  }

  private addEventPause() {
    if (!this.meta.entry) {
      this.children.unshift(new CommandNode('pause', ['1']));
    }
  }

  public compile($: Compiler, state: State) {
    state.viewport = this.getViewportPosition();
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
