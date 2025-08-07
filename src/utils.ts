import yarn from '@mnbroatch/bondage/src/parser/nodes.js';
import type { ChangeEntry, ContentJSON } from './types';
import { join } from 'path';

export function getExpressionValue(expression: InstanceType<typeof yarn.InlineExpressionNode>): string {
  return 'stringLiteral' in expression.expression ? (expression.expression.stringLiteral as string) : '';
}

export function stringifyTextNode(node: OfOrArrayOf<InstanceType<typeof yarn.TextNode>>) {
  return (Array.isArray(node) ? node : [node]).map(d => d.text.trim()).join('#$b#');
}

export async function getModId(dir: string): Promise<string> {
  const manifest = await Bun.file(join(dir, 'manifest.json')).json();
  if (manifest.UniqueID) {
    return manifest.UniqueID;
  } else {
    throw new Error('Could not detect unique ID from content manifest.');
  }
}

export function getContentPatch(changes: ChangeEntry[]): ContentJSON {
  return { Format: '2.7.0', Changes: changes };
}

export function getContentEntries(content: ContentJSON): Record<string, string> {
  return content.Changes.reduce((a, content) => Object.assign(a, content.Entries), {});
}
