import { CommandNode } from './CommandNode';
import { LiteralNode } from './LiteralNode';
import { TextNode } from './TextNode';
import { JumpNode } from './JumpNode';
import { RootNode } from './RootNode';
import { Node } from './Node';
import { DocumentNode } from './DocumentNode';
import { WhenNode } from './WhenNode';
import { StartNode } from './StartNode';
import { ResponseNode } from './ResponseNode';
import { MessageNode } from './MessageNode';
import { SpeakNode } from './SpeakNode';
import { QuestionNode } from './QuestionNode';

export type AnyNode =
  | CommandNode
  | DocumentNode
  | RootNode
  | LiteralNode
  | MessageNode
  | SpeakNode
  | TextNode
  | QuestionNode
  | ResponseNode
  | JumpNode
  | WhenNode
  | StartNode;

export {
  CommandNode,
  LiteralNode,
  TextNode,
  MessageNode,
  SpeakNode,
  JumpNode,
  RootNode,
  DocumentNode,
  QuestionNode,
  ResponseNode,
  Node,
  WhenNode,
  StartNode
};
