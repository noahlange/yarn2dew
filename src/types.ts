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
