import yarn from '@mnbroatch/bondage/src/parser/nodes.js';
import type { ChangeEntry, ContentJSON } from './types';
import { join } from 'path';
import type { YarnToDew } from './lib';

export function getExpressionValue(expression: InstanceType<typeof yarn.InlineExpressionNode>): string {
  return 'stringLiteral' in expression.expression ? (expression.expression.stringLiteral as string) : '';
}

export function stringifyTextNode(node: OfOrArrayOf<InstanceType<typeof yarn.TextNode>>) {
  return (Array.isArray(node) ? node : [node]).map(d => d.text.trim()).join('#$b#');
}

export async function getModId(): Promise<string> {
  const manifest = await Bun.file(join(process.cwd(), 'manifest.json')).json();
  if (manifest.UniqueID) {
    return manifest.UniqueID;
  } else {
    throw new Error('Could not detect unique ID from content manifest.');
  }
}

export function getContentData(yarnToSdv: YarnToDew): Record<'content' | 'i18n', Record<string, string>> {
  const [[, content], [, i18n]] = yarnToSdv.emit();
  return {
    content: (content as ContentJSON).Changes[0].Entries,
    i18n: i18n as Record<string, string>
  };
}

export function getContentPatch(changes: ChangeEntry[]): ContentJSON {
  return { Format: '2.7.0', Changes: changes };
}
