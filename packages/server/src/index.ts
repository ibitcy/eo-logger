import { ECS, Transport as BaseTransport } from '@eo-logger/core';
import * as os from 'os';

import type { Client } from '@elastic/elasticsearch';

export * from './utils';

export interface Params {
  client: Client;
  indexBase: string;
  maxQueueSize: number;
}

interface Index {
  index: {
    _index: string;
  };
}

export class Transport extends BaseTransport {
  protected readonly client: Client;
  protected readonly indexBase: string;
  protected readonly maxQueueSize: number;
  protected readonly queue: Array<ECS.Message | Index> = [];

  public constructor(params: Params) {
    super();

    this.client = params.client;
    this.maxQueueSize = params.maxQueueSize;
    this.indexBase = params.indexBase;
  }

  public send(message: ECS.Message): void {
    this.addToQueue(message);

    if (this.queue.length > this.maxQueueSize) {
      this.client.bulk({
        body: this.queue,
      });

      this.queue.length = 0;
    }
  }

  protected addToQueue(message: ECS.Message) {
    const now = new Date();
    const nowFormatted = `${now.getFullYear()}.${(now.getMonth() + 1)
      .toString()
      .padStart(2, '0')}.${now.getDate().toString().padStart(2, '0')}`;

    this.queue.push(
      {
        index: {
          _index: `${this.indexBase}-${nowFormatted}`,
        },
      },
      {
        '@timestamp': now.toISOString(),
        host: {
          name: os.hostname(),
          uptime: process.uptime(),
        },
        ...message,
      },
    );
  }
}
