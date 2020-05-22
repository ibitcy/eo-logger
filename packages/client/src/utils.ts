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
