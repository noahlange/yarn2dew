import yarn, { type NodeType } from '@mnbroatch/bondage/src/parser/nodes.js';

import { Parser, type ParseResult } from '../lib';
import { Node } from './Node';
import { LiteralNode } from './LiteralNode';
import { QuestionNode } from './QuestionNode';
import { MessageNode } from './MessageNode';
import { SpeakNode } from './SpeakNode';

export abstract class TextNode extends Node {
  public static parse(
    parser: Parser,
    node: InstanceType<typeof yarn.TextNode>,
    nodes: NodeType[]
  ): ParseResult<SpeakNode | MessageNode | LiteralNode | QuestionNode> {
    const index = nodes.indexOf(node);

    let next = nodes[index + 1];
    let nodeText = node.text;
    let nextIndex = index + 1;

    if (next instanceof yarn.DialogShortcutNode) {
      return QuestionNode.parse(parser, node, nodes);
    } else if (next instanceof yarn.InlineExpressionNode) {
      nodeText += LiteralNode.parse(parser, next, nodes).value.value;
      nextIndex += 1;
    }

    let [name, text] = nodeText.split(': ');
    let nodeSpeaker = text ? name : null;

    return {
      next: nextIndex,
      value: nodeSpeaker ? new SpeakNode(text, nodeSpeaker) : new MessageNode(nodeText)
    };
  }

  public i18n: string | null = null;
}
