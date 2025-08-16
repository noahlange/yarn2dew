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
    const [rawName, rawText = null] = node.text.split(':');
    const speaker = rawText ? rawName : null;
    let text = rawText ? rawText.trimStart() : rawName;

    let nextIndex = nodes.indexOf(node) + 1;
    let next = nodes[nextIndex];
    const chunks: string[] = [];

    if (next instanceof yarn.DialogShortcutNode) {
      return QuestionNode.parse(parser, node, nodes);
    } else {
      while (next && 'lineNum' in next && next.lineNum === node.lineNum) {
        nextIndex += 1;
        if (next instanceof yarn.InlineExpressionNode) {
          text += LiteralNode.parse(parser, next, []).value.value;
        } else if (next instanceof yarn.TextNode) {
          text += next.text;
        }
        next = nodes[nextIndex];
      }
    }

    if (text) chunks.push(text);

    if (next instanceof yarn.TextNode) {
      const { value, next: returnIndex } = this.parse(parser, next, nodes);
      // inline consecutive dialogue nodes from the same speaker
      if (value instanceof TextNode && speaker && value.speaker === speaker) {
        // add a break to the most recently-added chunk, then add the chunks from the next node.
        chunks.splice(chunks.length - 1, 1, `${text} #$b$# `, ...value.chunks);
        return {
          next: returnIndex,
          value: new TextNode(chunks, speaker)
        };
      }
    }

    if (!chunks.length) {
      throw new Error('no chunks for node???');
    }

    return { next: nextIndex, value: new TextNode(chunks, speaker) };
  }

  private getI18nKey($: Compiler, text: string) {
    // don't i18nify commands
    if (text.startsWith('#')) return text;
    return `{{${text.startsWith('i18n:') ? text : $.getI18nKey(text)}}}`;
  }

  public compile($: Compiler) {
    if (this.speaker) {
      $.writeLine(`speak ${this.speaker} "`);
      $.write(this.chunks.map(chunk => this.getI18nKey($, chunk)).join(' '));
      $.write('"');
    } else {
      for (const chunk of this.chunks) {
        $.writeLine(`message "${this.getI18nKey($, chunk)}"`);
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
