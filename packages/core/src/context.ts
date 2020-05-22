import { ECS } from './ecs';

export class Context {
  protected client: ECS.Client = {};
  protected custom: Record<string, unknown> = {};
  protected http: ECS.HTTP = {};
  protected labels: Record<string, string> = {};
  protected log: ECS.Log = {};
  protected metrics: Record<string, number> = {};
  protected service: ECS.Service = {};
  protected tracing: ECS.Tracing = {};
  protected url: ECS.Url = {};
  protected userAgent: ECS.UserAgent = {};

  protected meta: ECS.Meta = {
    version: '1.5.0',
  };

  public aggregate(): ECS.Message {
    return {
      client: this.client,
      custom: this.custom,
      ecs: this.meta,
      http: this.http,
      labels: this.labels,
      log: this.log,
      metrics: this.metrics,
      service: this.service,
      tracing: this.tracing,
      url: this.url,
      user_agent: this.userAgent,
    };
  }

  public setLabels(labels: Record<string, string>): void {
    this.labels = {
      ...this.labels,
      ...labels,
    };
  }

  public setClient(client: ECS.Client): void {
    this.client = {
      ...this.client,
      ...client,
    };
  }

  public setCustom(custom: Record<string, unknown>): void {
    this.custom = {
      ...this.custom,
      ...custom,
    };
  }

  public setUrl(url: ECS.Url): void {
    this.url = {
      ...this.url,
      ...url,
    };
  }

  public setUserAgent(userAgent: ECS.UserAgent): void {
    this.userAgent = {
      ...this.userAgent,
      ...userAgent,
    };
  }

  public setHttp(http: ECS.HTTP): void {
    this.http = {
      ...this.http,
      ...http,
    };
  }

  public setLog(log: ECS.Log): void {
    this.log = {
      ...this.log,
      ...log,
    };
  }

  public setService(service: ECS.Service): void {
    this.service = {
      ...this.service,
      ...service,
    };
  }

  public setTracing(tracing: ECS.Tracing): void {
    this.tracing = {
      ...this.tracing,
      ...tracing,
    };
  }

  public setMetrics(metrics: Record<string, number>): void {
    this.metrics = {
      ...this.metrics,
      ...metrics,
    };
  }
}
