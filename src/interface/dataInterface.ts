export interface VideoDto {
  id: number;
  title: string;
  thumbnail: string;
  description: string;
  url: string;
  createdAt: string;
  updatedAt: string;
}

export interface StateDto {
  id: number;
  name: string;
  code: string;
  state: string;
  createdAt: string;
  updatedAt: string;
}
export interface ApiResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  state: string;
}
