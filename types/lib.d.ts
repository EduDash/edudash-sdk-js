/// <reference lib="esnext.asynciterable" />
/// <reference types="node" />

import { Agent } from 'http';

declare module 'edudash' {
  namespace EduDash {
    export class EduDashResource {
      static extend<
        T extends { [props: string]: any } & {
          includeBasic?: Array<
            'create' | 'retrieve' | 'update' | 'list' | 'del'
          >;
        }
      >(spec: T): EduDashResource & T;

      static method(spec: {
        method: string;
        path: string;
        methodType?: 'list';
      }): (...args: any[]) => object;
    }

    export type LatestApiVersion = '2021-04-03';
    export type HttpAgent = Agent;

    export interface EduDashConfig {
      /**
       * It is recommended that you update your account's API Version to
       * the latest version in order to use Typescript with this library.
       *
       * To remain on the default API version, pass `null` or another version
       * instead of the latest version.
       *
       * @docs https://docs.edudash.org/
       */
      apiVersion: LatestApiVersion;

      /**
       * Optionally supply that you are using TypeScript, this is only used
       * for analytics.
       */
      typescript?: true;

      /**
       * Automatic network retries up to the specified number of retries (default 0).
       */
      maxNetworkRetries?: number;

      /**
       * Use a custom http agent.
       * Useful if you want to make requests through a proxy
       */
      httpAgent?: HttpAgent;

      /**
       * Request timeout in milliseconds
       * Default 80000
       */
      timeout?: number;

      /**
       * For testing purposes, to use local or a different host in order to test the API.
       */
      host?: string;

      /**
       * To change the port for testing purposes (default 443).
       */
      port?: string | number;

      /**
       * The protocol for the request, either `https` or `http`;
       */
      protocol?: 'https' | 'http';

      /**
       * Optional telemetry, pass `false` to disable headers
       * that allow for EduDash to make improvements based on statistics
       * such as API latency.
       */
      telemetry?: boolean;

      /**
       * For plugin authors to identify code and receive statistics based on the app
       * information.
       */
      appInfo?: AppInfo;
    }

    export interface AppInfo {
      name: string;
      url?: string;
      version?: string;
    }

    export interface RequestOptions {
      /**
       * Use a specific API Key for a request.
       */
      apiKey?: String;
    }
  }
}
