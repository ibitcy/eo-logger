import { ECS } from './ecs';

export class Formatter {
  public formatDebugMessage(
    message: string,
    context: ECS.Message,
  ): Readonly<ECS.Message> {
    return {
      ...context,
      message,
      log: {
        ...context.log,
        level: 'debug',
      },
    };
  }

  public formatErrorMessage(
    code: string,
    context: ECS.Message,
    error?: Error,
    meta?: Record<string, unknown>
  ): Readonly<ECS.Message> {
    let ecsError: ECS.Error = { code };

    if (error) {
      ecsError = {
        ...ecsError,
        message: String(error.message),
        stack_trace: String(error.stack),
        type: String(error.name || error.constructor.name || ''),
      };
    }

    return {
      ...context,
      error: ecsError,
      error_meta: meta,
      log: {
        ...context.log,
        level: 'error',
      },
    };
  }

  public formatWarningMessage(
    message: string,
    context: ECS.Message,
  ): Readonly<ECS.Message> {
    return {
      ...context,
      message,
      log: {
        ...context.log,
        level: 'warning',
      },
    };
  }
}
