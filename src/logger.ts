import { Context } from './context';
import { Formatter } from './formatter';
import { Transport } from './transport';

export interface LoggerParams {
  debugMode?: boolean;
}

export class Logger {
  protected readonly debugMode: boolean;
  protected readonly formatter = new Formatter();
  protected readonly transport = new Transport();

  public readonly context = new Context();

  public constructor(params?: LoggerParams) {
    this.debugMode = Boolean(params?.debugMode);
  }

  public debug(message: string, data?: Record<string, unknown>): void {
    const ecsMessage = this.formatter.formatDebugMessage(
      message,
      this.context.aggregate(),
    );

    if (this.debugMode) {
      console.debug('[eo-logger]', ecsMessage);
    }

    this.transport.send(ecsMessage);
  }

  public error(code: string, error?: Error): void {
    const ecsMessage = this.formatter.formatErrorMessage(
      code,
      this.context.aggregate(),
      error,
    );

    if (this.debugMode) {
      console.debug('[eo-logger]', ecsMessage);
    }

    this.transport.send(ecsMessage);
  }

  public warning(message: string): void {
    const ecsMessage = this.formatter.formatWarningMessage(
      message,
      this.context.aggregate(),
    );

    if (this.debugMode) {
      console.debug('[eo-logger]', ecsMessage);
    }

    this.transport.send(ecsMessage);
  }
}
