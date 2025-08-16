import { YarnToDew } from './lib';
import { Config } from './lib/Config';

const config = await Config.load();
console.log('\n✅ Config loaded.');
await config.writeYSLS();
console.log('🧶 Wrote Yarn Language Service config file.');
await new YarnToDew(config).start();
