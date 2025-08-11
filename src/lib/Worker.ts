declare var self: Worker;

import { generate } from '../generate';

self.onmessage = (event: MessageEvent<{ namespace: string; filename: string }>) => {
  postMessage(generate(event.data.namespace, event.data.filename));
};
