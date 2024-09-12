interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
  [key: string]: any;
}

export type { ApiResponse };
