import { YarnToDew } from './lib';
import { getManifest } from './utils';

const moddir = process.cwd();
const manifest = await getManifest(moddir);
await new YarnToDew(manifest, moddir).start();
