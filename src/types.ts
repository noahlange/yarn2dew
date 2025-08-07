export interface ChangeEntry {
  Action: string;
  Target: string;
  Entries: Record<string, string>;
}

export interface ContentJSON {
  Format: string;
  Changes: ChangeEntry[];
}

export type I18N = Record<string, string>;

export interface BuilderOutput {
  source?: string;
  content: ContentJSON;
  i18n: I18N;
}
