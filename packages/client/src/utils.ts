import { ECS } from '@eo-logger/core';

export function getScreenInformation(): Record<string, string> | undefined {
  try {
    return {
      orientation: (window.screen.orientation || {}).type,
      size: `${window.screen.width}x${window.screen.height}`,
    };
  } catch (error) {
    console.error(error);
  }
}

/**
 * @see https://www.ibm.com/developerworks/ru/library/bd-r-javascript-w3c/index.html
 * @see https://developers.google.com/web/fundamentals/performance/critical-rendering-path/measure-crp?hl=ru
 */
export function getPerformanceMetrics(): Record<string, number> | undefined {
  try {
    const {
      domComplete,
      domLoading,
      domInteractive,
      navigationStart,
    } = window.performance.timing;

    const metrics: Record<string, number> = {};

    if (domComplete > 0) {
      metrics.domComplete = domComplete - domLoading;
      metrics.domCompleteFull = domComplete - navigationStart;
    }

    if (domInteractive > 0) {
      metrics.domInteractive = domInteractive - domLoading;
      metrics.domInteractiveFull = domInteractive - navigationStart;
    }

    return metrics;
  } catch (error) {
    console.error(error);
  }
}

export function getNetworkInformation(): ECS.NetworkInformation | undefined {
  try {
    const { connection } = navigator as any;
    if (typeof connection === 'object') {
      return {
        downlink: connection.downlink,
        effectiveType: connection.effectiveType,
        rtt: connection.rtt,
      };
    }
  } catch (error) {
    console.error(error);
  }
}
