import yarn from '@mnbroatch/bondage/src/parser/nodes.js';
import type { ChangeEntry, ContentJSON, ContentPatcherManifest } from './types';
import { join } from 'path';

export function getExpressionValue(expression: InstanceType<typeof yarn.InlineExpressionNode>): string {
  return 'stringLiteral' in expression.expression ? (expression.expression.stringLiteral as string) : '';
}

export function stringifyTextNode(node: OfOrArrayOf<InstanceType<typeof yarn.TextNode>>) {
  return (Array.isArray(node) ? node : [node]).map(d => d.text.trim()).join('#$b#');
}

export function trim(text: string) {
  return text
    .split('\n')
    .map(l => l.trim())
    .join('\n');
}

export async function getManifest(dir: string): Promise<ContentPatcherManifest> {
  return Bun.file(join(dir, 'manifest.json')).json();
}

export function getContentPatch(changes: ChangeEntry[]): ContentJSON {
  return { Format: '2.7.0', Changes: changes };
}

export function getContentEntries(content: ContentJSON): Record<string, string> {
  return content.Changes.reduce((a, content) => Object.assign(a, content.Entries), {});
}
export async function getContent(dir: string): Promise<ContentJSON> {
  return Bun.file(join(dir, 'content.json')).json();
}

export function toScreamingSnakeCase(str: string) {
  if (str.toUpperCase() === str) return str;
  return str
    .split(/\.?(?=[A-Z])/)
    .join('_')
    .toUpperCase();
}
