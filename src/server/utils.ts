import * as geoIp from 'geoip-lite';
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

export function fillClientDataByIp(client: ECS.Client, ip: string): ECS.Client {
  const lookupResult = geoIp.lookup(ip);
  let geo: ECS.Geo = {};

  if (lookupResult && lookupResult.country) {
    geo = {
      country_iso_code: lookupResult.country,
      city_name: lookupResult.city,
    };
  }

  return {
    ...client,
    geo,
    ip,
  };
}
