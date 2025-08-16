import yarn from '@mnbroatch/bondage/src/parser/nodes.js';
import { type NodeType } from '@mnbroatch/bondage/src/parser/nodes.js';

import { match, P } from 'ts-pattern';
import { WhenNode } from './WhenNode';
import { StartNode } from './StartNode';
import { MacroNode } from './MacroNode';
import { Node } from './Node';
import { Compiler, Parser, type State } from '../lib';

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
        .with(P.string.startsWith('$'), () => new MacroNode(name.slice(1), args))
        .with('wait', () => {
          const [, seconds] = args;
          const num = +seconds;
          const ms = isNaN(num) ? '1000' : (num * 1000).toString();
          return new CommandNode('pause', [ms]);
        })
        .with('when', () => WhenNode.parse(parser, node as GenericCommandNode, []).value)
        .with('start', () => {
          const [, x, y, d] = args.map(Number);
          return new StartNode(args[0], x, y, d);
        })
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
