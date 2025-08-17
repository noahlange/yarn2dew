import yarn from '@mnbroatch/bondage/src/parser/nodes.js';
import { type NodeType } from '@mnbroatch/bondage/src/parser/nodes.js';

import { match, P } from 'ts-pattern';
import { Node } from './Node';
import { Compiler, Parser, type State } from '../lib';
import { WhenNode } from './WhenNode';

type GenericCommandNode = InstanceType<typeof yarn.GenericCommandNode>;
type StopCommandNode = InstanceType<typeof yarn.StopCommandNode>;

export class CommandNode extends Node {
  public static parse(
    parser: Parser,
    node: GenericCommandNode | StopCommandNode,
    nodes: NodeType[]
  ) {
    const index = nodes.indexOf(node);

    const [name, ...args] = match(node)
      .with(P.instanceOf(yarn.StopCommandNode), () => ['end'])
      .otherwise(({ command }) => command[0].text.split(' '));

    return {
      value: match(name)
        .with('$', () => new CommandNode(args[0], args.slice(1)))
        .with('when', () => WhenNode.parse(parser, node as GenericCommandNode, []).value)
        .otherwise(name => new CommandNode(name, args)),
      next: index + 1
    };
  }

  public compile($: Compiler, state: State) {
    if (this.name in $.config.commands) {
      $.config.commands[this.name]($, state, ...this.args);
    } else {
      $.writeLine(`${this.name} ${this.args.join(' ')}`.trim());
    }
  }

  constructor(
    public name: string,
    public args: string[] = []
  ) {
    super();
    this.name = name.trim();
  }
}
