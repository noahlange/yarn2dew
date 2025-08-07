declare var self: Worker;

import { generate } from '../generate';

self.onmessage = (event: MessageEvent<{ name: string; source: string }>) => {
  const res = generate(event.data.name, event.data.source);
  postMessage(res);
};
