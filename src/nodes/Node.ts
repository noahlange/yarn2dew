import type { Compiler, State } from '../lib';

export abstract class Node {
  public abstract compile($: Compiler, state: State): void;
}
