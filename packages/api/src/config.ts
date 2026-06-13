import axios, { AxiosError } from 'axios';

export interface ApiClientConfig {
  baseUrl: string;
  onUnauthorized: () => void;
}

export let config: ApiClientConfig = {
  baseUrl: '',
  onUnauthorized: () => {},
};

export function configureApiClient(cfg: ApiClientConfig): void {
  config = cfg;
}

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export const axiosInstance = axios.create({
  headers: { 'Content-Type': 'application/json' },
});

axiosInstance.interceptors.request.use(async reqConfig => {
  reqConfig.baseURL = config.baseUrl;


  return reqConfig;
});

axiosInstance.interceptors.response.use(
  response => response,
  (error: unknown) => {
    if (error instanceof AxiosError && error.response) {
      const { status, data } = error.response;

      if (status === 401) {
        config.onUnauthorized();
        throw new ApiError(401, 'Unauthorized');
      }

      throw new ApiError(status, parseErrorData(data, status));
    }

    throw error;
  }
);

function parseErrorData(data: unknown, status: number): string {
  if (data && typeof data === 'object') {
    const obj = data as { detail?: string; message?: string };
    if (typeof obj.detail === 'string') return obj.detail;
    if (typeof obj.message === 'string') return obj.message;
  }

  if (typeof data === 'string' && data) {
    try {
      const parsed = JSON.parse(data) as { detail?: string; message?: string };
      if (typeof parsed.detail === 'string') return parsed.detail;
      if (typeof parsed.message === 'string') return parsed.message;
    } catch {
      return data;
    }
    return data;
  }

  return `API error: ${status}`;
}
