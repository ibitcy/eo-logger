# eo-logger

Isomorphic logger based on Elastic Common Schema.

## How to install

```
yarn add eo-logger
```

Or

```
npm install eo-logger --save
```

## Quick start

Logger contains 3 main components:
* Context
* Transport
* Formatter

For start using required to create instance of class `Logger`

```
export const logger = new Logger();
```

Now you can import logger in any place of your application and use one of next methods

`logger.error` - for errors

`logger.debug` - for debug some information

`logger.warning` - for warnings

## Client utilities

`getPerformanceMetrics` - function returns object with performance metrics of page speed loading

## Server utilities

`parseUserAgent` - function returns `ECS.UserAgent` object with information based on `user-agent` string

`parseGeo` - function return `ECS.Geo` object with information based on ip string
