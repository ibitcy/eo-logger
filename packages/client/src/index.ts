import {
  Context as BaseContext,
  ECS,
  Logger as BaseLogger,
  LoggerParams,
} from '@eo-logger/core';

import {
  getNetworkInformation,
  getPerformanceMetrics,
  getScreenInformation,
} from './utils';

export * from './utils';

export class Logger extends BaseLogger {
  public constructor(params: LoggerParams) {
    super({
      ...params,
      context: params.context || new Context(),
    });

    this.context.setHttp({
      request: {
        referrer: document.referrer,
      },
    });
  }

  public collectMetrics(): void {
    const performanceMetrics = getPerformanceMetrics();

    if (performanceMetrics) {
      this.context.setMetrics(performanceMetrics);
    }

    this.debug('metrics', {
      networkInformation: getNetworkInformation(),
      screen: getScreenInformation(),
    });

    this.context.clearMetrics();
  }
}

export class Context extends BaseContext {
  public aggregate(): ECS.Message {
    const ecsMessage = super.aggregate();

    ecsMessage.url = {
      fragment: document.location.hash,
      original: document.location.href,
      path: document.location.pathname,
      query: document.location.search,
    };

    return ecsMessage;
  }
}
