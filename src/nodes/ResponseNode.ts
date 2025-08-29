import { type AnyNode, JumpNode } from '.';
import { Compiler, type State } from '../lib';

export class ResponseNode {
  public precompile($: Compiler) {
    this.i18n ??= $.getI18nKey(this.text);
    this.id = this.content.find(c => c instanceof JumpNode)?.destination ?? null;
  }

  public compile($: Compiler, state: State) {
    if (!this.id) {
      throw new Error('Cannot compile response node without destination ID');
    }
    $.useScope(this.id, () => {
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
    console.log({ text, content });
    const trimmed = text.trim();
    if (trimmed.startsWith('i18n:')) {
      this.i18n = trimmed;
    } else {
      // remove quotes
      this.text = trimmed;
    }
  }
}
