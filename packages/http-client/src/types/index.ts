export type RequestConfig = Exclude<RequestInit, 'method'>;

export interface HttpClientConfig {
  baseUrl: string;
  defaultHeaders?: HeadersInit;
}

export interface HttpClient {
  get: <T>(url: string, config?: RequestConfig) => Promise<T>;
  post: <T, D>(url: string, data: D, config?: RequestConfig) => Promise<T>;
  put: <T, D>(url: string, data: D, config?: RequestConfig) => Promise<T>;
  patch: <T, D>(url: string, data: D, config?: RequestConfig) => Promise<T>;
  delete: <T>(url: string, config?: RequestConfig) => Promise<T>;
}
