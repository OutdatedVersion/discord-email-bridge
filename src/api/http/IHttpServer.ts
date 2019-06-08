import { Server } from 'http';

export interface IHttpServer {
  start(port: number): Promise<Server>;

  /**
   *
   * @param path The path to accept requests for this hook at
   * @param hook A function that will accept the request's body, and return the response body
   */
  registerBodyHook(path: string, hook: (data: any) => Promise<any>): void;
}
