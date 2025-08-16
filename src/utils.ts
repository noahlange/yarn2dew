import yarn from '@mnbroatch/bondage/src/parser/nodes.js';
import type { ChangeEntry, ContentJSON, ContentPatcherManifest, Y2DConfig } from './types';
import { join } from 'path';
import macros from './macros';
import commands from './commands';

export function getExpressionValue(expression: InstanceType<typeof yarn.InlineExpressionNode>): string {
  return 'stringLiteral' in expression.expression ? (expression.expression.stringLiteral as string) : '';
}

export function stringifyTextNode(node: OfOrArrayOf<InstanceType<typeof yarn.TextNode>>) {
  return (Array.isArray(node) ? node : [node]).map(d => d.text.trim()).join(' #$b# ');
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
  return { Changes: changes };
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

export async function tryGetConfig(namespace: string, directory: string): Promise<Y2DConfig> {
  const filenames = [`y2d.config.ts`, `y2d.config.js`];
  const config = { namespace, directory, macros: { ...macros }, commands: { ...commands } };

  for (const name of filenames) {
    try {
      const mod = await import(join(directory, name));
      if (!mod.default) throw new Error('no default export');
      logFns(mod.default);
      Object.assign(config, {
        macros: { ...config.macros, ...(mod.default.macros ?? {}) },
        commands: { ...config.commands, ...(mod.default.commands ?? {}) }
      });
      break;
    } catch {
      // no-op
    }
  }
  return config;
}

export function logFns(config: Y2DConfig) {
  console.group('registered commands');
  for (const key in config.commands) console.log(key);
  console.groupEnd();

  console.group('registered macros');
  for (const key in config.macros) console.log(key);
  console.groupEnd();
}
