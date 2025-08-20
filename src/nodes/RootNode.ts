import { Node } from './Node';

import { Compiler, type State } from '../lib';
import { type AnyNode, CommandNode, type DocumentMeta } from '.';

export class RootNode extends Node {
  private getViewportPosition() {
    if (!this.meta.start) return { x: 0, y: 0 };
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

  private getFarmerStart() {
    return `farmer ${this.getStart()} 2`;
  }

  private getStart() {
    const { x, y } = this.getViewportPosition();
    return `${x} ${y}`;
  }

  private addEventPrelude($: Compiler) {
    const farmerStart = $.scope.decls.findLast(({ key }) => key == 'start farmer');
    if (!farmerStart) {
      $.declare('start farmer', this.getFarmerStart());
    }

    if (this.meta.entry) {
      const buffer = $.getBuffer();
      const music = $.scope.decls.findLast(d => d.key === 'music')?.value ?? this.meta.music;

      buffer.unshift(
        music ?? 'continue',
        this.getStart(),
        $.scope.decls
          .filter(d => d.key.startsWith('start '))
          .map(d => d.value)
          .join(' ')
      );
    }
  }

  private addEventPause() {
    if (!this.meta.entry) {
      this.children.unshift(new CommandNode('pause', ['1']));
    }
  }

  public compile($: Compiler, state: State) {
    if (this.meta.music) $.declare('music', this.meta.music);
    if (this.meta.entry && this.meta.start) {
      state.viewport = this.getViewportPosition();
      state.position['farmer'] = { ...state.viewport, d: 2 };
      $.declare('start farmer', this.getFarmerStart());
    }

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
