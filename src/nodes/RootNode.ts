import { Node } from './Node';

import { Compiler, ScopeType } from '../lib';
import { type AnyNode, CommandNode } from '.';

export class RootNode extends Node {
  private getStart(): string {
    if (this.meta.start) {
      return (this.meta.start.split(',') as string[]).map(v => v.trim()).join(' ');
    }
    return '-1000,-1000';
  }

  private getMusic() {
    if (this.meta.music) {
      return this.meta.music;
    }
    return 'continue';
  }

  private addEventPrelude($: Compiler) {
    if (this.meta.entry) {
      $.prependLine(this.getStart()!);
      $.prependLine(this.getMusic());
    }
  }

  private addEventPause() {
    if (this.meta.entry === false) {
      this.children.unshift(new CommandNode('pause', ['1']));
    }
  }

  public compile($: Compiler) {
    $.useScope(ScopeType.EVENT, this.meta.title, () => {
      this.addEventPause();
      for (const node of this.children) {
        node.compile($);
      }
      this.addEventPrelude($);
    });
  }

  constructor(
    public children: AnyNode[],
    public meta: Record<string, any>
  ) {
    super();
  }
}
