/**
 * API configuration for the absences application
 */

// API endpoints and configuration
export const API_CONFIG = {
  ABSENCES_URL: 'https://front-end-kata.brighthr.workers.dev/api/absences',
  CONFLICT_URL: 'https://front-end-kata.brighthr.workers.dev/api/conflict',
  PAGE_SIZE: 10,
} as const;

// API response types
export interface ApiAbsence {
  id: number;
  startDate: string;
  endDate: string;
  days?: number;
  employee: {
    firstName: string;
    lastName: string;
  };
  approved: boolean;
  absenceType: string;
}

export interface ApiConflict {
  id: number;
  conflicts: boolean;
}

// API error types
export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

// API utility functions
export const buildApiUrl = (baseUrl: string, endpoint: string, params?: Record<string, string>): string => {
  const url = new URL(endpoint, baseUrl);
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.append(key, value);
    }
  }
  return url.toString();
};

export const handleApiError = (error: unknown): ApiError => {
  if (error instanceof Error) {
    return {
      message: error.message,
      status: 'status' in error ? (error.status as number) : undefined,
    };
  }
  
  if (typeof error === 'object' && error !== null && 'message' in error) {
    return {
      message: String(error.message),
      status: 'status' in error ? Number(error.status) : undefined,
    };
  }
  
  return {
    message: 'An unknown error occurred',
  };
};

// API request timeout configuration
export const REQUEST_CONFIG = {
  TIMEOUT_MS: 30000, // 30 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY_MS: 1000, // 1 second
} as const;

// HTTP status codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
} as const;