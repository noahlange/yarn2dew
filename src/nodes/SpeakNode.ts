import type { Compiler } from '../lib';

export class SpeakNode {
  public compile($: Compiler) {
    $.writeLine(this.speaker ? `speak ${this.speaker} "` : `message "`);

    $.write(
      this.chunks
        .map(chunk => (chunk.startsWith('i18n:') ? chunk : $.getI18nKey(chunk)))
        .map(v => `{{${v}}}`)
        .join(' ')
    );

    $.write('"');
  }

  public constructor(
    public chunks: string[],
    public speaker: string | null = null
  ) {}
}
