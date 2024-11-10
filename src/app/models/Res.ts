export interface Res<T> {
    success: boolean;
    httpStatusCode: number;
    message: string;
    data: T[];
    totalCount: number;
  }
  