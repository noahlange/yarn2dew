import { YarnToDew } from './lib';

const moddir = process.cwd();
await new YarnToDew(moddir).start();
