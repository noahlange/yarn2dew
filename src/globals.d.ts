type OfOrArrayOf<T> = T | T[];

interface Stringifiable {
  toString(): string;
}

declare module '@mnbroatch/bondage/src/parser/nodes.js' {
  class Text {}
  class Shortcut {}
  class Conditional {}
  class Assignment {}
  class Literal {}
  class Expression {}
  class FunctionCall {}
  class Command {}

  abstract class BinaryExpression extends Expression {
    public expression1: Expression;
    public expression2: Expression;
    public constructor(expression1: Expression, expression2: Expression);
  }

  abstract class UnaryExpression extends Expression {
    public expression: Expression;
    public constructor(expression: Expression);
  }

  interface LineNo {
    first_line: number;
  }

  class DialogShortcutNode extends Shortcut {
    public readonly type = 'DialogShortcutNode';
    public text: TextNode[];
    public content: NodeType[];
    public lineNum: number;
    public hashtags: string[];
    public conditionalExpression?: Expression;

    public constructor(
      text: string,
      content: string,
      lineNo: LineNo,
      hashtags: string[],
      conditionalExpression: Expression
    );
  }

  class IfNode extends Conditional {
    public readonly type = 'IfNode';
    public expression: Expression;
    public statement: NodeType[];
    public constructor(expression: Expression, statement: NodeType[]);
  }

  class IfElseNode extends Conditional {
    public readonly type = 'IfElseNode';

    public expression: Expression;
    public statement: unknown[];
    public elseStatement: ElseNode;

    constructor(expression: Expression, statement: unknown, elseStatement: unknown);
  }

  class ElseNode extends Conditional {
    public readonly type = 'ElseNode';
    public statement: unknown[];
    constructor(statement: unknown[]);
  }

  class ElseIfNode extends Conditional {
    public readonly type = 'ElseIfNode';

    public expression: Expression;
    public statement: unknown[];
    public elseStatement: ElseNode;

    constructor(expression: Expression, statement: unknown, elseStatement: unknown);
  }

  class GenericCommandNode extends Command {
    public readonly type = 'GenericCommandNode';
    public hashtags: string[];
    public command: TextNode[];
    public lineNum: number;
    constructor(command: TextNode, lineNo: LineNo, hashtags?: string[]);
  }

  class JumpCommandNode extends Command {
    public readonly type = 'JumpCommandNode';
    public readonly destination: string;
  }

  class StopCommandNode extends Command {
    public readonly type = 'StopCommandNode';
  }

  class TextNode extends Text {
    public readonly type = 'TextNode';
    public hashtags: string[];
    public lineNum: number;
    public text: string;
  }

  class EscapedCharacterNode extends Text {
    public readonly type = 'EscapedCharacterNode';
    public hashtags: string[];
    constructor(text: string, lineNo: LineNo, hashtags?: string[]);
  }

  class NumericLiteralNode extends Literal {
    public readonly type = 'NumericLiteralNode';
    public numericLiteral: number;
    constructor(numericLiteral: number);
  }

  class StringLiteralNode extends Literal {
    public readonly type = 'StringLiteralNode';
    public stringLiteral: number;
    constructor(stringLiteral: string);
  }

  class BooleanLiteralNode extends Literal {
    public readonly type = 'BooleanLiteralNode';
    public booleanLiteral: number;
    constructor(booleanLiteral: boolean);
  }

  class VariableNode extends Literal {
    public readonly type = 'VariableNode';
    public variableName: string;
    constructor(variableName: string);
  }

  class UnaryMinusExpressionNode extends UnaryExpression {
    public readonly type = 'UnaryMinusExpressionNode';
    public expression: Expression;
  }

  class ArithmeticExpressionAddNode extends BinaryExpression {
    public readonly type = 'ArithmeticExpressionAddNode';
  }

  class ArithmeticExpressionMinusNode extends BinaryExpression {
    public readonly type = 'ArithmeticExpressionMinusNode';
  }

  class ArithmeticExpressionMultiplyNode extends BinaryExpression {
    public readonly type = 'ArithmeticExpressionMultiplyNode';
  }

  class ArithmeticExpressionExponentNode extends BinaryExpression {
    public readonly type = 'ArithmeticExpressionExponentNode';
  }

  class ArithmeticExpressionDivideNode extends BinaryExpression {
    public readonly type = 'ArithmeticExpressionDivideNode';
  }

  class ArithmeticExpressionModuloNode extends BinaryExpression {
    public readonly type = 'ArithmeticExpressionModuloNode';
  }

  class NegatedBooleanExpressionNode extends UnaryExpression {
    public readonly type = 'NegatedBooleanExpressionNode';
  }

  class BooleanOrExpressionNode extends BinaryExpression {
    public readonly type = 'BooleanOrExpressionNode';
  }

  class BooleanAndExpressionNode extends BinaryExpression {
    public readonly type = 'BooleanAndExpressionNode';
  }

  class BooleanXorExpressionNode extends BinaryExpression {
    public readonly type = 'BooleanXorExpressionNode';
  }

  class EqualToExpressionNode extends BinaryExpression {
    public readonly type = 'EqualToExpressionNode';
  }

  class NotEqualToExpressionNode extends BinaryExpression {
    public readonly type = 'NotEqualToExpressionNode';
  }

  class GreaterThanExpressionNode extends BinaryExpression {
    public readonly type = 'GreaterThanExpressionNode';
  }

  class GreaterThanOrEqualToExpressionNode extends BinaryExpression {
    public readonly type = 'GreaterThanOrEqualToExpressionNode';
  }

  class LessThanExpressionNode extends BinaryExpression {
    public readonly type = 'LessThanExpressionNode';
  }

  class LessThanOrEqualToExpressionNode extends BinaryExpression {
    public readonly type = 'LessThanOrEqualToExpressionNode';
  }

  class SetVariableEqualToNode extends Assignment {
    public readonly type = 'SetVariableEqualToNode';
    public variableName: string;
    public expression: Expression;
    public constructor(variableName: string, expression: Expression);
  }

  class FunctionCallNode extends FunctionCall {
    public readonly type = 'FunctionCallNode';
    public functionName: string;
    public args: Literal[];
    public lineNum: number;
    public hashtags: string[];
    public constructor(
      functionName: string,
      args: string[],
      lineNo: LineNo,
      hashtags?: string[]
    );
  }

  class InlineExpressionNode extends Expression {
    public readonly type = 'InlineExpressionNode';
    public lineNum: number;
    public hashtags: string[];
    public expression: Expression;
    public constructor(expression: Expression, lineNo: LineNo, hashtags?: string[]);
  }

  interface NodeTypes {
    Text: typeof Text;
    Shortcut: typeof Shortcut;
    Conditional: typeof Conditional;
    Assignment: typeof Assignment;
    Literal: typeof Literal;
    Expression: typeof Expression;
    FunctionCall: typeof FunctionCall;
    Command: typeof Command;
  }

  const value: {
    types: NodeTypes;
    DialogShortcutNode: typeof DialogShortcutNode;
    IfNode: typeof IfNode;
    IfElseNode: typeof IfElseNode;
    ElseNode: typeof ElseNode;
    ElseIfNode: typeof ElseIfNode;
    GenericCommandNode: typeof GenericCommandNode;
    JumpCommandNode: typeof JumpCommandNode;
    StopCommandNode: typeof StopCommandNode;
    TextNode: typeof TextNode;
    EscapedCharacterNode: typeof EscapedCharacterNode;
    NumericLiteralNode: typeof NumericLiteralNode;
    StringLiteralNode: typeof StringLiteralNode;
    BooleanLiteralNode: typeof BooleanLiteralNode;
    VariableNode: typeof VariableNode;
    UnaryMinusExpressionNode: typeof UnaryMinusExpressionNode;
    ArithmeticExpressionAddNode: typeof ArithmeticExpressionAddNode;
    ArithmeticExpressionMinusNode: typeof ArithmeticExpressionMinusNode;
    ArithmeticExpressionMultiplyNode: typeof ArithmeticExpressionMultiplyNode;
    ArithmeticExpressionExponentNode: typeof ArithmeticExpressionExponentNode;
    ArithmeticExpressionDivideNode: typeof ArithmeticExpressionDivideNode;
    ArithmeticExpressionModuloNode: typeof ArithmeticExpressionModuloNode;
    NegatedBooleanExpressionNode: typeof NegatedBooleanExpressionNode;
    BooleanOrExpressionNode: typeof BooleanOrExpressionNode;
    BooleanAndExpressionNode: typeof BooleanAndExpressionNode;
    BooleanXorExpressionNode: typeof BooleanXorExpressionNode;
    EqualToExpressionNode: typeof EqualToExpressionNode;
    NotEqualToExpressionNode: typeof NotEqualToExpressionNode;
    GreaterThanExpressionNode: typeof GreaterThanExpressionNode;
    GreaterThanOrEqualToExpressionNode: typeof GreaterThanOrEqualToExpressionNode;
    LessThanExpressionNode: typeof LessThanExpressionNode;
    LessThanOrEqualToExpressionNode: typeof LessThanOrEqualToExpressionNode;
    SetVariableEqualToNode: typeof SetVariableEqualToNode;
    FunctionCallNode: typeof FunctionCallNode;
    InlineExpressionNode: typeof InlineExpressionNode;
  };

  export type NodeType =
    | DialogShortcutNode
    | IfNode
    | IfElseNode
    | ElseNode
    | ElseIfNode
    | GenericCommandNode
    | JumpCommandNode
    | StopCommandNode
    | TextNode
    | EscapedCharacterNode
    | NumericLiteralNode
    | StringLiteralNode
    | BooleanLiteralNode
    | VariableNode
    | UnaryMinusExpressionNode
    | ArithmeticExpressionAddNode
    | ArithmeticExpressionMinusNode
    | ArithmeticExpressionMultiplyNode
    | ArithmeticExpressionExponentNode
    | ArithmeticExpressionDivideNode
    | ArithmeticExpressionModuloNode
    | NegatedBooleanExpressionNode
    | BooleanOrExpressionNode
    | BooleanAndExpressionNode
    | BooleanXorExpressionNode
    | EqualToExpressionNode
    | NotEqualToExpressionNode
    | GreaterThanExpressionNode
    | GreaterThanOrEqualToExpressionNode
    | LessThanExpressionNode
    | LessThanOrEqualToExpressionNode
    | SetVariableEqualToNode
    | FunctionCallNode
    | Expression
    | InlineExpressionNode;

  export default value;
}

declare module '@mnbroatch/bondage/src/index.js' {
  import type { NodeType } from '@mnbroatch/bondage/src/parser/nodes.js';

  export type DocumentMeta = {
    target: string;
    title: string;
    override?: boolean;
    filename?: string;
    entry?: boolean;
  } & { [key: string]: string };

  class Runner {
    yarnNodes: Record<string, string>;
    load(text: string): void;
    getParserNodes(key: string): {
      parserNodes: NodeType[];
      metadata: DocumentMeta;
    };
  }

  const value: {
    Runner: typeof Runner;
  };

  export default value;
  export type { Runner };
}
