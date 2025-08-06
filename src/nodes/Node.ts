import { Compiler } from '../lib';

export abstract class Node {
  public abstract compile($: Compiler): void;
  public abstract readonly type: string;
}
