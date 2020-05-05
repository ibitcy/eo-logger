import { UAParser } from 'ua-parser-js';
import { ECS } from '../ecs';

export function parseUserAgent(userAgent: string): ECS.UserAgent {
  const parser = new UAParser(userAgent);
  const device = parser.getDevice();
  const osInformation = parser.getOS();
  const browser = parser.getBrowser();

  return {
    name: browser.name,
    version: browser.version,
    device: {
      name: device.vendor,
    },
    original: userAgent,
    os: {
      name: osInformation.name,
      version: osInformation.version,
    },
  };
}
