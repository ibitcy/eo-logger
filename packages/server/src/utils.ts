import { ECS } from '@eo-logger/core';
import * as geoIp from 'geoip-lite';
import { UAParser } from 'ua-parser-js';

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

export function parseGeo(ip: string): ECS.Geo {
  const lookupResult = geoIp.lookup(ip);

  if (lookupResult && lookupResult.country) {
    return {
      country_iso_code: lookupResult.country,
      city_name: lookupResult.city,
    };
  }

  return {};
}
