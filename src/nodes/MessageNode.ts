import { Compiler } from '../lib';
import { TextNode } from './TextNode';

export class MessageNode implements TextNode {
  public compile($: Compiler) {
    const i18n = (this.i18n ??= $.getI18nKey(this.text));
    $.writeLine(`message "{{${i18n}}}"`);
  }

  public i18n: string | null = null;

  constructor(public text: string) {
    let trimmed = text.trim();
    if (trimmed.startsWith('i18n:')) {
      this.i18n = trimmed;
    } else {
      this.text = trimmed;
    }
  }
}
