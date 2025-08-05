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
