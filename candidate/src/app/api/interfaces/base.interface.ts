import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RequestOptions {
  headers?: HttpHeaders | Record<string, string | string[]>;
  observe?: 'body';
  params?:
    | HttpParams
    | Record<string, string | number | boolean | readonly (string | number | boolean)[]>;
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
}

export interface BaseInterface {
  getById<T>(endPoint: string, options?: RequestOptions): Observable<T>;
  get<T>(endPoint: string, options?: RequestOptions): Observable<T>;
  delete<T>(endPoint: string, options?: RequestOptions): Observable<T>;
  post<T>(endPoint: string, body?: unknown, options?: RequestOptions): Observable<T>;
  put<T>(endPoint: string, options?: RequestOptions): Observable<T>;
}
