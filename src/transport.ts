import { ECS } from './ecs';

export class Transport {
  public send(message: ECS.Message): void {
    console.debug('[eo-logger]', message);
  }
}
