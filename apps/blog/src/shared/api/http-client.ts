import { createHttpClient } from '@nettee-sample/http-client';

const BASE_URL = 'http://localhost:4000/api';

export const httpClient = createHttpClient({ baseUrl: BASE_URL });
