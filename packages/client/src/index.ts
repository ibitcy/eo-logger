import {
  Context as BaseContext,
  ECS,
  Logger as BaseLogger,
  LoggerParams,
} from '@eo-logger/core';
import { getCLS, getFCP, getFID, getLCP, getTTFB, Metric } from 'web-vitals';

import { getNetworkInformation, getScreenInformation } from './utils';

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

    const saveMetric = (metric: Metric) => {
      this.context.setMetrics({
        [metric.name]: metric.value,
      });
    };

    getCLS(saveMetric);
    getFCP(saveMetric);
    getFID(saveMetric);
    getLCP(saveMetric);
    getTTFB(saveMetric);
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

    ecsMessage.networkInformation = getNetworkInformation();
    ecsMessage.screen = getScreenInformation();

    return ecsMessage;
  }
}
