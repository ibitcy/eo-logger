import { Context } from './context';
import { ECS } from './ecs';
import { Formatter } from './formatter';
import { Transport } from './transport';

export interface LoggerParams {
  context?: Context;
  formatter?: Formatter;
  transport?: Transport;
}

export class Logger {
  protected readonly formatter: Formatter;
  protected readonly transport: Transport;

  public readonly context: Context;

  public constructor({ context, formatter, transport }: LoggerParams = {}) {
    this.context = context || new Context();
    this.formatter = formatter || new Formatter();
    this.transport = transport || new Transport();
  }

  public debug(message: string, payload?: ECS.Message): void {
    const ecsMessage = this.formatter.formatDebugMessage(message, {
      ...this.context.aggregate(),
      ...payload,
    });

    this.transport.send(ecsMessage);
  }

  public error(
    code: string,
    error?: Error,
    meta?: Record<string, unknown>,
  ): void {
    const ecsMessage = this.formatter.formatErrorMessage(
      code,
      this.context.aggregate(),
      error,
      meta,
    );

    this.transport.send(ecsMessage);
  }

  public warning(message: string): void {
    const ecsMessage = this.formatter.formatWarningMessage(
      message,
      this.context.aggregate(),
    );

    this.transport.send(ecsMessage);
  }
}
