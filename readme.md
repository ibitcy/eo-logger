# eo-logger

* Isomorphic logger based on Elastic Common Schema
* Elastic Common Schema typings out of the box

The main idea is make fully isomorphic logger for collect logs by Elastic Common Schema from web applications and NodeJS applications.

## How to install

```bash
yarn add eo-logger
```

Or

```bash
npm install eo-logger --save
```

## Quick start

Logger contains 3 main components:
* Context
* Transport
* Formatter

For start using required to create instance of class `Logger`

```ts
import { Logger } from 'eo-logger';

export const logger = new Logger();
```

Now you can import logger in any place of your application and use one of next methods

`logger.error` - for errors

`logger.debug` - for debug some information

`logger.warning` - for warnings

By default logger transport just display `ECS.Message` in console.
If you want to collect logs, you have to implement your own `Transport` class.
Actually it is quite simple, look at example below:

```ts
import { Logger, Transport } from 'eo-logger';

class MyTransport extends Transport {
  public send(message: ECS.Message): void {
    fetch('api_endpoint', {
      method: 'post',
      body: JSON.stringify(message),
    });
  }
}

export const logger = new Logger({
  transport: new MyTransport(),
});
```

## Client utilities

`getPerformanceMetrics` - function returns object with performance metrics of page speed loading

## Server utilities

`parseUserAgent` - function returns `ECS.UserAgent` object with information based on `user-agent` string

`parseGeo` - function return `ECS.Geo` object with information based on ip string
