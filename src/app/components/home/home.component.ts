import { Component, OnInit } from '@angular/core';
import { BaseResponse } from '../../dtos/response/BaseResponse/base.response';
import { NewsResponse } from '../../dtos/response/news/news.response';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { NewsService } from './../../services/news.service';
import { NewsListResponse } from '../../dtos/response/news/news_list.response';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  newsList: NewsResponse[] = [];

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.getAllNews();
  }

  getAllNews() {
    this.newsService.getAllNews().subscribe({
      next: (response: BaseResponse<NewsListResponse>) => {
        this.newsList = response.result.newsDtoList;
        console.log(this.newsList);
      },
      complete: () => {},

      error: (error: any) => {
        alert(error.error.message);
      },
    });
  }
}
