import type { Macro } from './lib';

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

export interface Y2DPartialConfig {
  namespace: string;
  directory?: string;
  macros?: Record<string, Macro>;
  commands?: Record<string, Macro>;
}

export interface Y2DConfig {
  namespace: string;
  directory: string;
  macros: Record<string, Macro>;
  commands: Record<string, Macro>;
}
