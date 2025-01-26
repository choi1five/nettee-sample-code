import { DEFAULT_HEADERS } from '@/constants';
import { HttpClient, HttpClientConfig, RequestConfig } from '@/types';

class FetchHttpClient implements HttpClient {
  private baseUrl: string;
  private defaultHeaders: HeadersInit;

  constructor(config: HttpClientConfig) {
    this.baseUrl = config.baseUrl;
    this.defaultHeaders = config.defaultHeaders ?? {};
  }

  setBaseUrl(url: string) {
    this.baseUrl = url;
  }

  setHeaders(headers: Record<string, string>) {
    this.defaultHeaders = headers;
  }

  addHeader(key: string, value: string) {
    this.defaultHeaders[key as keyof HeadersInit] = value;
  }

  removeHeader(key: string) {
    delete this.defaultHeaders[key as keyof HeadersInit];
  }

  private getRequestUrl(url: string): string {
    return url.startsWith('/') ? `${this.baseUrl}${url}` : url;
  }

  private async request<T>({
    method,
    url,
    data = null,
    config = {},
  }: {
    method: string;
    url: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: any;
    config?: RequestConfig;
  }): Promise<T> {
    const isFormData = data instanceof FormData;
    const headers = isFormData
      ? { ...this.defaultHeaders, ...config?.headers }
      : { ...DEFAULT_HEADERS, ...this.defaultHeaders, ...config?.headers };

    const response = await fetch(this.getRequestUrl(url), {
      method,
      headers,
      ...(data && { body: isFormData ? data : JSON.stringify(data) }),
      ...config,
    } satisfies RequestInit);

    if (!response.ok) {
      throw new Error(`${method} ${url} failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async get<T>(url: string, config?: RequestConfig) {
    return this.request<T>({ method: 'GET', url, config });
  }

  async post<T, D>(url: string, data: D, config?: RequestConfig) {
    return this.request<T>({ method: 'POST', url, data, config });
  }

  async put<T, D>(url: string, data: D, config?: RequestConfig) {
    return this.request<T>({ method: 'PUT', url, data, config });
  }

  async patch<T, D>(url: string, data: D, config?: RequestConfig) {
    return this.request<T>({ method: 'PATCH', url, data, config });
  }

  async delete<T>(url: string, config?: RequestConfig) {
    return this.request<T>({ method: 'DELETE', url, config });
  }
}

export const createHttpClient = (config: HttpClientConfig): HttpClient => {
  return new FetchHttpClient(config);
};
