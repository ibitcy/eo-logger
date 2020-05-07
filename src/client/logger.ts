import { Context as BaseContext } from '../context';
import { ECS } from '../ecs';
import { Logger as BaseLogger, LoggerParams } from '../logger';
import {
  getNetworkInformation,
  getPerformanceMetrics,
  getScreenInformation,
} from './utils';

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

  public collectMetrics(metrics: Record<string, number> = {}): void {
    const ecsMessage = this.context.aggregate();
    ecsMessage.networkInformation = getNetworkInformation();
    ecsMessage.screen = getScreenInformation();

    ecsMessage.metrics = {
      ...getPerformanceMetrics(),
      ...ecsMessage.metrics,
      ...metrics,
    };

    this.transport.send(ecsMessage);
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
