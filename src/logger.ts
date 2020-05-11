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

  public constructor(params?: LoggerParams) {
    this.context = params?.context || new Context();
    this.formatter = params?.formatter || new Formatter();
    this.transport = params?.transport || new Transport();
  }

  public debug(message: string, payload?: ECS.Message): void {
    const ecsMessage = this.formatter.formatDebugMessage(message, {
      ...this.context.aggregate(),
      ...payload,
    });

    this.transport.send(ecsMessage);
  }

  public error(code: string, error?: Error): void {
    const ecsMessage = this.formatter.formatErrorMessage(
      code,
      this.context.aggregate(),
      error,
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
