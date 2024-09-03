export class NewsResponse {
  title: string;
  content: string;
  thumbnail: string;

  constructor(data: any) {
    this.title = data.title;
    this.content = data.content;
    this.thumbnail = data.thumbnail;
  }
}
