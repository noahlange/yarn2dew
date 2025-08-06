import type { Compiler } from '../lib';
import { TextNode } from './TextNode';

export class SpeakNode implements TextNode {
  public compile($: Compiler) {
    this.i18n ??= $.getI18nKey(this.text);
    $.writeLine(`speak ${this.speaker} {{${this.i18n}}}`);
  }

  public i18n: string | null = null;
  public readonly type = 'SpeakNode';

  public constructor(
    public text: string,
    public speaker: string
  ) {
    let trimmed = text.trim();
    if (trimmed.startsWith('i18n:')) {
      this.i18n = trimmed;
    } else {
      // add quotes
      this.text = `"${trimmed}"`;
    }
  }
}
