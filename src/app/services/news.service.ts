import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponse } from '../dtos/response/BaseResponse/base.response';
import { NewsListResponse } from '../dtos/response/news/news_list.response';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private getAllNewsUrl: string = `${environment.apiUrl}/news`;

  constructor(private http: HttpClient) {}

  getAllNews(): Observable<BaseResponse<NewsListResponse>> {
    const params = new HttpParams().set('page', 1).set('limit', 10);
    return this.http.get<BaseResponse<NewsListResponse>>(this.getAllNewsUrl, {
      params,
    });
  }
}
