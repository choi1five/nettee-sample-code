type RequestConfig = Exclude<RequestInit, 'method'>;

interface HttpClient {
  get: <T>(url: string, config?: RequestConfig) => Promise<T>;
  post: <T, D>(url: string, data: D, config?: RequestConfig) => Promise<T>;
  put: <T, D>(url: string, data: D, config?: RequestConfig) => Promise<T>;
  patch: <T, D>(url: string, data: D, config?: RequestConfig) => Promise<T>;
  delete: <T>(url: string, config?: RequestConfig) => Promise<T>;
}

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};

const BASE_URL = 'http://localhost:3000/api';

export const httpClient: HttpClient = {
  async get<T>(url: string, config?: RequestConfig) {
    const response = await fetch(`${BASE_URL}${url}`, {
      method: 'GET',
      headers: {
        ...DEFAULT_HEADERS,
        ...config?.headers,
      },
      ...config,
    } satisfies RequestInit);
    if (!response.ok) {
      throw new Error(`GET ${url} failed: ${response.status} ${response.statusText}`);
    }
    return response.json() as Promise<T>;
  },

  async post<T, D>(url: string, data: D, config?: RequestConfig) {
    const isFormData = data instanceof FormData;
    const headers = isFormData ? { ...config?.headers } : { ...DEFAULT_HEADERS, ...config?.headers };

    const response = await fetch(`${BASE_URL}${url}`, {
      method: 'POST',
      headers,
      body: isFormData ? data : JSON.stringify(data),
      ...config,
    } satisfies RequestInit);
    if (!response.ok) {
      throw new Error(`POST ${url} failed: ${response.status} ${response.statusText}`);
    }
    return response.json() as Promise<T>;
  },

  async put<T, D>(url: string, data: D, config?: RequestConfig) {
    const isFormData = data instanceof FormData;
    const headers = isFormData ? { ...config?.headers } : { ...DEFAULT_HEADERS, ...config?.headers };

    const response = await fetch(`${BASE_URL}${url}`, {
      method: 'PUT',
      headers,
      body: isFormData ? data : JSON.stringify(data),
      ...config,
    } satisfies RequestInit);
    if (!response.ok) {
      throw new Error(`PUT ${url} failed: ${response.status} ${response.statusText}`);
    }
    return response.json() as Promise<T>;
  },

  async patch<T, D>(url: string, data: D, config?: RequestConfig) {
    const isFormData = data instanceof FormData;
    const headers = isFormData ? { ...config?.headers } : { ...DEFAULT_HEADERS, ...config?.headers };

    const response = await fetch(`${BASE_URL}${url}`, {
      method: 'PATCH',
      headers,
      body: isFormData ? data : JSON.stringify(data),
      ...config,
    } satisfies RequestInit);
    if (!response.ok) {
      throw new Error(`PATCH ${url} failed: ${response.status} ${response.statusText}`);
    }
    return response.json() as Promise<T>;
  },

  async delete<T>(url: string, config?: RequestConfig) {
    const response = await fetch(`${BASE_URL}${url}`, {
      method: 'DELETE',
      headers: {
        ...DEFAULT_HEADERS,
        ...config?.headers,
      },
      ...config,
    } satisfies RequestInit);
    if (!response.ok) {
      throw new Error(`DELETE ${url} failed: ${response.status} ${response.statusText}`);
    }
    return response.json() as Promise<T>;
  },
};
