interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
  [key: string]: any;
}

interface UserModel {
  id?: number;
  username?: string;
  password?: string;
  image?: string;
  role?: string;
  created?: string;
  updated?: string;
  [key: string]: any;
}

export type { ApiResponse, UserModel };
