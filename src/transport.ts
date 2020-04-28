import { ECS } from "./ecs";

export class Transport {
  public send(message: ECS.Message) {
    console.debug(message);
  }
}