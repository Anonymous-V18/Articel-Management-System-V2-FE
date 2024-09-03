export class BaseResponse<T> {
  code: number;
  message: string;
  result: T;

  constructor(data: BaseResponse<T>) {
    this.code = data.code;
    this.message = data.message;
    this.result = data.result;
  }

}
