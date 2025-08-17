import type { Compiler } from './lib';
import type { YSLSCommand } from './ysls/types';

export interface ChangeEntry {
  LogName?: string;
  Action: string;
  Target: string;
  Entries: Record<string, string>;
}

export interface IncludeChange extends ChangeEntry {
  Action: 'Include';
  FromFile: string;
}

export interface ContentJSON {
  Format?: string;
  Changes: Array<ChangeEntry | IncludeChange>;
}

export type I18N = Record<string, string>;

export interface BuilderOutput {
  filename?: string;
  content: ContentJSON;
  i18n: I18N;
}

export interface ContentPatcherDependency {
  UniqueID: string;
  IsRequired: boolean;
}

export interface ContentPatcherManifest {
  Name: string;
  Author: string;
  Version: string;
  Description: string;
  UniqueID: string;
  UpdateKeys: string[];
  ContentPackFor?: { UniqueID: string };
  Dependencies: ContentPatcherDependency[];
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface State {}

export interface Macro {
  ($: Compiler, state: State, ...args: string[]): void;
  ysls?: YSLSCommand;
  getInitialState?: (state: State) => State;
}
