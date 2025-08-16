import { type AnyNode, CommandNode, JumpNode } from '.';
import { Compiler, ScopeType, type State } from '../lib';

export class ResponseNode {
  public precompile($: Compiler) {
    this.i18n ??= $.getI18nKey(this.text);
    this.id = this.content.find(c => c instanceof JumpNode)?.destination ?? null;
  }

  public compile($: Compiler, state: State) {
    if (!this.id) throw new Error('Cannot compile response node without destination ID');
    $.useScope(ScopeType.EVENT, this.id, () => {
      for (const node of this.content) {
        node.compile($, state);
      }
    });
  }

  public i18n: string | null = null;
  public id: string | null = null;

  constructor(
    public text: string,
    public content: AnyNode[]
  ) {
    this.content.unshift(new CommandNode('pause', ['1']));
    const trimmed = text.trim();
    if (trimmed.startsWith('i18n:')) {
      this.i18n = trimmed;
    } else {
      // remove quotes
      this.text = trimmed;
    }
  }
}
