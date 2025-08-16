import { YarnToDew } from './lib';
import { getManifest, tryGetConfig } from './utils';

const moddir = process.cwd();
const manifest = await getManifest(moddir);
const config = await tryGetConfig(manifest.UniqueID, moddir);

await new YarnToDew(config).start();
