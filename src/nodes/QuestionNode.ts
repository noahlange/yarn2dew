import yarn, { type NodeType } from '@mnbroatch/bondage/src/parser/nodes.js';
import type { Parser, Compiler, ParseResult } from '../lib';
import { TextNode } from './TextNode';
import { stringifyTextNode } from '../utils';
import { ResponseNode } from './ResponseNode';

type DialogShortcutNode = InstanceType<typeof yarn.DialogShortcutNode>;

export class QuestionNode implements TextNode {
  public static parse(
    parser: Parser,
    node: InstanceType<typeof yarn.TextNode>,
    nodes: NodeType[]
  ): ParseResult<QuestionNode> {
    // consume until we hit the last dialog shortcut
    let [name, text] = node.text.split(': ');
    let trimmed = text?.trim();
    let nodeText = text ? trimmed : name;
    let index = nodes.indexOf(node);

    const options: ResponseNode[] = [];

    while (nodes[index + 1] instanceof yarn.DialogShortcutNode) {
      const { content, text } = nodes[index + 1] as DialogShortcutNode;
      options.push(new ResponseNode(stringifyTextNode(text), parser.process(content)));
      index++;
    }

    return {
      next: index + 1,
      value: new QuestionNode(nodeText, options)
    };
  }

  public readonly type = 'QuestionNode';

  public compile($: Compiler) {
    const i18n = (this.i18n ??= $.getI18nKey(this.text));

    for (const r of this.responses) {
      // needed in order to get i18n keys
      r.precompile($);
    }

    $.write(`/quickQuestion {{${i18n}}}#`);
    $.write(
      `${this.responses
        .filter(r => r instanceof ResponseNode)
        .map(r => `{{${r.i18n}}}`)
        .join('#')}`
    );
    $.write('(break)');
    $.write(`${this.responses.map(r => `switchEvent "${$.namespace}.${r.id}"`).join('(break)')}`);
    for (const r of this.responses) r.compile($);
  }

  public i18n: string | null = null;

  constructor(
    public text: string,
    public responses: ResponseNode[]
  ) {
    let trimmed = text.trim();
    if (trimmed.startsWith('i18n:')) {
      this.i18n = trimmed;
    } else {
      this.text = `"${trimmed}"`;
    }
  }
}
