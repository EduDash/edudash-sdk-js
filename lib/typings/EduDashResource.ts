import http, { Agent } from 'http';
import https from 'https';
import path from 'path';
import {
  EduDashAPIError,
  EduDashAuthenticationError,
  EduDashError,
} from '../Error';
/*
export class EduDashResource {
  static extend<
    T extends { [prop: string]: any } & {
      includeBasic?: Array<'create' | 'retrieve' | 'update' | 'list' | 'del'>;
    }
  >(spec: T): EduDashResource & T;

  static method(spec: {
    method: string;
    path: string;
    methodType?: 'list';
  }): (...args: any[]) => object;
}
*/
