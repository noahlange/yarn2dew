import yarn, { type NodeType } from '@mnbroatch/bondage/src/parser/nodes.js';
import type { Parser, Compiler, ParseResult, State } from '../lib';
import { stringifyTextNode } from '../utils';
import { ResponseNode } from './ResponseNode';

type DialogShortcutNode = InstanceType<typeof yarn.DialogShortcutNode>;

export class QuestionNode {
  public static parse(
    parser: Parser,
    node: InstanceType<typeof yarn.DialogShortcutNode>,
    nodes: NodeType[]
  ): ParseResult<QuestionNode> {
    let next = nodes.indexOf(node);
    // lookback to see if there's dialogue
    const prev = nodes[next - 1];
    let nodeText: string | null = null;

    if (prev instanceof yarn.TextNode) {
      // consume until we hit the last dialog shortcut
      const [name, text] = prev.text.split(': ');
      const trimmed = text?.trim();
      nodeText = text ? trimmed : name;
    }

    const options: ResponseNode[] = [];

    while (nodes[next] instanceof yarn.DialogShortcutNode) {
      const { content, text } = nodes[next] as DialogShortcutNode;

      const response = new ResponseNode(
        stringifyTextNode(text),
        parser.process(content ?? [], false)
      );
      options.push(response);
      next++;
    }

    return {
      next,
      value: new QuestionNode(options, nodeText)
    };
  }

  public compile($: Compiler, state: State) {
    if (this.text) {
      const i18n = (this.i18n ??= $.getI18nKey(this.text));
      if (i18n.startsWith('i18n:')) {
        $.write(`/pause 1/quickQuestion {{${i18n}}}#`);
      } else {
        $.write(`/pause 1/quickQuestion ${i18n}#`);
      }
    } else {
      $.write('/pause 1/quickQuestion #');
    }

    // needed in order to get i18n keys
    for (const r of this.responses) r.precompile($);

    $.write(
      `${this.responses
        .filter(r => r instanceof ResponseNode)
        .map(r => (r.i18n?.startsWith('i18n') ? `{{${r.i18n}}}` : r.i18n))
        .join('#')}`
    );

    for (const response of this.responses) {
      $.write('(break)');
      if (response.id) {
        $.write(`switchEvent "${$.namespace}.${response.id}"`);
      } else {
        $.write('pause 1');
      }
    }

    for (const r of this.responses) {
      if (r.id) r.compile($, state);
    }
  }

  public i18n: string | null = null;

  constructor(
    public responses: ResponseNode[],
    public text: string | null = null
  ) {
    if (text) {
      const trimmed = text.trim();
      if (trimmed.startsWith('i18n:')) {
        this.i18n = trimmed;
      } else {
        this.text = trimmed;
      }
    }
  }
}
