import { CommandNode } from './CommandNode';
import { LiteralNode } from './LiteralNode';
import { TextNode } from './TextNode';
import { JumpNode } from './JumpNode';
import { RootNode } from './RootNode';
import { Node } from './Node';
import { DocumentNode } from './DocumentNode';
import { WhenNode } from './WhenNode';
import { ResponseNode } from './ResponseNode';
import { QuestionNode } from './QuestionNode';
import { MacroNode } from './MacroNode';

export type AnyNode =
  | CommandNode
  | DocumentNode
  | RootNode
  | LiteralNode
  | TextNode
  | QuestionNode
  | ResponseNode
  | JumpNode
  | WhenNode
  | MacroNode;

export {
  CommandNode,
  LiteralNode,
  TextNode,
  JumpNode,
  RootNode,
  DocumentNode,
  QuestionNode,
  ResponseNode,
  Node,
  WhenNode,
  MacroNode
};

export type { DocumentMeta } from './DocumentNode';
