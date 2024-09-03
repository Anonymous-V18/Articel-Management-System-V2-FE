import { NewsResponse } from "./news.response";

export class NewsListResponse {
  page: number;
  totalPages: number;
  newsDtoList: NewsResponse[];

  constructor(data: NewsListResponse) {
    this.page = data.page;
    this.totalPages = data.totalPages;
    this.newsDtoList = data.newsDtoList;
  }
}
