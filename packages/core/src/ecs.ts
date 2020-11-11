export namespace ECS {
  export type Message = Base &
    Partial<{
      agent: Agent;
      client: Client;
      custom: Record<string, unknown>; // Custom field
      ecs: Meta;
      error: Error;
      error_meta: Record<string, unknown>; // Custom field
      host: Host;
      http: HTTP;
      log: Log;
      metrics: Record<string, number>; // Custom field
      networkInformation: NetworkInformation; // Custom field
      screen: Record<string, string>; // Custom field
      service: Service;
      tracing: Tracing;
      url: Url;
      user_agent: UserAgent;
    }>;

  /**
   * @see https://www.elastic.co/guide/en/ecs/master/ecs-base.html
   */
  export type Base = Partial<{
    '@timestamp': string;

    labels: Record<string, string>;
    message: string;
    tags: string[];
  }>;

  /**
   * @see https://www.elastic.co/guide/en/ecs/current/ecs-agent.html
   */
  export type Agent = Partial<{
    ephemeral_id: string;
    id: string;
    name: string;
    type: string;
    version: string;
  }>;

  export type HTTP = Partial<{
    request: Request;
    response: Response;
  }>;

  export type Request = Partial<{
    body: Body;
    bytes: number;
    method: string;
    referrer: string;
  }>;

  export type Response = Partial<{
    body: Body;
    bytes: number;
    status_code: number;
    version: string;
  }>;

  export type Body = Partial<{
    bytes: number;
    content: string;
  }>;

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation
   */
  export type NetworkInformation = Partial<{
    downlink: number;
    effectiveType: string;
    rtt: number;
  }>;

  /**
   * @see https://www.elastic.co/guide/en/ecs/current/ecs-ecs.html
   */
  export type Meta = Partial<{
    version: string;
  }>;

  /**
   * @see https://www.elastic.co/guide/en/ecs/master/ecs-client.html
   */
  export type Client = Partial<{
    address: string;
    bytes: number;
    domain: string;
    geo: Geo;
    ip: string;
    mac: string;
    packets: number;
    port: number;
    registered_domain: string;
    top_level_domain: string;
    user: User;
  }>;

  /**
   * @see https://www.elastic.co/guide/en/ecs/current/ecs-url.html
   */
  export type Url = Partial<{
    domain: string;
    extension: string;
    fragment: string;
    full: string;
    original: string;
    password: string;
    path: string;
    port: string;
    query: string;
    registered_domain: string;
    scheme: string;
    top_level_domain: string;
    username: string;
  }>;

  /**
   * @see https://www.elastic.co/guide/en/ecs/master/ecs-user.html
   */
  export type User = Partial<{
    domain: string;
    email: string;
    full_name: string;
    hash: string;
    is_demo?: 0 | 1;
    id: string;
    name: string;
  }>;

  /**
   * @see https://www.elastic.co/guide/en/ecs/current/ecs-user_agent.html
   */
  export type UserAgent = Partial<{
    device: UserAgentDevice;
    name: string;
    original: string;
    os: UserAgentOs;
    version: string;
  }>;

  export type UserAgentDevice = Partial<{
    name: string;
  }>;

  export type UserAgentOs = Partial<{
    family: string;
    full: string;
    kernel: string;
    name: string;
    platform: string;
    version: string;
  }>;

  /**
   * @see https://www.elastic.co/guide/en/ecs/current/ecs-geo.html
   */
  export type Geo = Partial<{
    city_name: string;
    continent_name: string;
    country_iso_code: string;
    country_name: string;
    location: string;
    name: string;
    region_iso_code: string;
    region_name: string;
  }>;

  /**
   * @see https://www.elastic.co/guide/en/ecs/current/ecs-error.html
   */
  export type Error = Partial<{
    code: string;
    id: string;
    message: string;
    stack_trace: string;
    type: string;
  }>;

  /**
   * @see https://www.elastic.co/guide/en/ecs/current/ecs-service.html
   */
  export type Service = Partial<{
    ephemeral_id: string;
    id: string;
    name: string;
    node: ServiceNode;
    state: string;
    type: string;
    version: string;
  }>;

  export type ServiceNode = Partial<{
    name: string;
  }>;

  /**
   * @see https://www.elastic.co/guide/en/ecs/current/ecs-log.html
   */
  export type Log = Partial<{
    level: 'error' | 'debug' | 'warning';
    logger: string;
    original: string;
  }>;

  /**
   * @see https://www.elastic.co/guide/en/ecs/current/ecs-tracing.html
   */
  export type Tracing = Partial<{
    id: string;
  }>;

  /**
   * @see https://www.elastic.co/guide/en/ecs/current/ecs-host.html
   */
  export type Host = Partial<{
    architecture: string;
    domain: string;
    hostname: string;
    id: string;
    ip: string;
    mac: string;
    name: string;
    type: string;
    uptime: number;
  }>;
}
