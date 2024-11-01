export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message?: string;
  metadata?: {
    limit: number;
    page: number;
    total: number;
    totalpages: number;
  };
  result: T;
}
