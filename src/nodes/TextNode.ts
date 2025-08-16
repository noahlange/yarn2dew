import yarn, { type NodeType } from '@mnbroatch/bondage/src/parser/nodes.js';

import { Compiler, Parser, type ParseResult } from '../lib';
import { Node } from './Node';
import { LiteralNode } from './LiteralNode';
import { QuestionNode } from './QuestionNode';

export class TextNode extends Node {
  public static parse(
    parser: Parser,
    node: InstanceType<typeof yarn.TextNode>,
    nodes: NodeType[]
  ): ParseResult<TextNode | LiteralNode | QuestionNode> {
    let nodeText = node.text;
    let [rawName, rawText = null] = nodeText.split(':');
    let speaker = rawText ? rawName : null;
    let text = rawText ? rawText.trimStart() : rawName;

    let nextIndex = nodes.indexOf(node) + 1;
    let next = nodes[nextIndex];
    let line = node.lineNum;
    let chunks = [];

    if (next instanceof yarn.DialogShortcutNode) {
      return QuestionNode.parse(parser, node, nodes);
    } else {
      while (next && 'lineNum' in next && next.lineNum === line) {
        nextIndex += 1;
        if (next instanceof yarn.InlineExpressionNode) {
          text += LiteralNode.parse(parser, next, []).value.value;
        } else if (next instanceof yarn.TextNode) {
          text += next.text;
        }
        next = nodes[nextIndex];
      }
    }

    if (text) {
      chunks.push(text);
    }

    if (!chunks.length) {
      console.log({ node, chunks });
      throw new Error('no chunks for node???');
    }

    return { next: nextIndex, value: new TextNode(chunks, speaker) };
  }

  public compile($: Compiler) {
    if (this.speaker) {
      $.writeLine(`speak ${this.speaker} "`);
      $.write(
        this.chunks
          .map(chunk => (chunk.startsWith('i18n:') ? chunk : $.getI18nKey(chunk)))
          .map(v => `{{${v}}}`)
          .join(' ')
      );
      $.write('"');
    } else {
      for (const chunk of this.chunks) {
        const i18n = chunk.startsWith('i18n:') ? chunk : $.getI18nKey(chunk);
        $.writeLine(`message "{{${i18n}}}"`);
      }
    }
  }

  public constructor(
    public chunks: string[] = [],
    public speaker: string | null = null
  ) {
    super();
  }
}
