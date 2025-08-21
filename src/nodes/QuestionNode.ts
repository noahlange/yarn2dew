import yarn, { type NodeType } from '@mnbroatch/bondage/src/parser/nodes.js';
import type { Parser, Compiler, ParseResult, State } from '../lib';
import { stringifyTextNode } from '../utils';
import { ResponseNode } from './ResponseNode';

type DialogShortcutNode = InstanceType<typeof yarn.DialogShortcutNode>;

export class QuestionNode {
  public static parse(
    parser: Parser,
    node: InstanceType<typeof yarn.TextNode>,
    nodes: NodeType[]
  ): ParseResult<QuestionNode> {
    // consume until we hit the last dialog shortcut
    const [name, text] = node.text.split(': ');
    const trimmed = text?.trim();
    const nodeText = text ? trimmed : name;
    let index = nodes.indexOf(node);

    const options: ResponseNode[] = [];

    while (nodes[index + 1] instanceof yarn.DialogShortcutNode) {
      const { content, text } = nodes[index + 1] as DialogShortcutNode;
      const response = new ResponseNode(stringifyTextNode(text), parser.process(content ?? []));
      options.push(response);
      index++;
    }

    return { next: index + 1, value: new QuestionNode(nodeText, options) };
  }

  public compile($: Compiler, state: State) {
    const i18n = (this.i18n ??= $.getI18nKey(this.text));

    // needed in order to get i18n keys
    for (const r of this.responses) r.precompile($);

    const quick = false;

    $.write(quick ? `/question null {{${i18n}}}#` : `/quickQuestion {{${i18n}}}#`);

    $.write(
      `${this.responses
        .filter(r => r instanceof ResponseNode)
        .map(r => `{{${r.i18n}}}`)
        .join('#')}`
    );

    $.write('(break)');

    for (const response of this.responses) {
      if (response.id) {
        $.write(`switchEvent "${$.namespace}.${response.id}"`);
      }
      $.write('(break)');
    }

    for (const r of this.responses) {
      if (r.id) r.compile($, state);
    }
  }

  public i18n: string | null = null;

  constructor(
    public text: string,
    public responses: ResponseNode[]
  ) {
    const trimmed = text.trim();
    if (trimmed.startsWith('i18n:')) {
      this.i18n = trimmed;
    } else {
      this.text = trimmed;
    }
  }
}
