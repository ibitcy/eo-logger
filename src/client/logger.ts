import { Context as BaseContext } from '../context';
import { ECS } from '../ecs';
import { Logger as BaseLogger, LoggerParams } from '../logger';
import { getPerformanceMetrics, getScreenInformation } from './utils';

export class Logger extends BaseLogger {
  public readonly context = new Context();

  public constructor(params?: LoggerParams) {
    super(params);

    this.context.setUserAgent({
      original: navigator.userAgent,
    });
  }

  public collectMetrics(metrics: Record<string, number> = {}): void {
    const ecsMessage = {
      ...this.context.aggregate(),
      metrics: {
        ...getPerformanceMetrics(),
        ...metrics,
      },
      screen: getScreenInformation(),
    };

    if (this.debugMode) {
      console.debug('[eo-logger]', ecsMessage);
    }

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
