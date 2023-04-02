import stringify from 'fast-safe-stringify';
import { Request } from 'express';

export class Context {
  private readonly _req: Request;
  private readonly _headers: Request['headers'];
  private readonly _url: Request['url'];
  private readonly _hostname: Request['hostname'];
  private readonly _params: Request['params'];
  private readonly _query: Request['query'];
  private readonly _body: Request['body'];
  private readonly _method: Request['method'];

  constructor(req: Request) {
    this._req = req;
    this._headers = req.headers;
    this._url = req.url;
    this._params = req.params;
    this._query = req.query;
    this._hostname = req.hostname;
    this._body = req.body;
    this._method = req.method;
  }

  public get req() {
    return this._req;
  }
  public get url() {
    return this._url;
  }

  public get params() {
    return this._params;
  }

  public get query() {
    return this._query;
  }

  public get hostname() {
    return this._hostname;
  }

  public get headers() {
    return this._headers;
  }

  public get body() {
    return this._body;
  }

  public get method() {
    return this._method;
  }

  toJson(): Record<string, unknown> {
    return {
      headers: this._headers,
      hostname: this._hostname,
      url: this._url,
      params: this._params,
      query: this._query,
      body: this._body,
      method: this._method,
    };
  }

  toString(): string {
    return stringify(this.toJson());
  }

  toFormattedString(): string {
    return stringify(this.toJson(), null, 2);
  }
}
