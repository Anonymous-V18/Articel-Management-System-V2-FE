import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginDTO } from '../dtos/request/users/login.dto';
import { BaseResponse } from '../dtos/response/BaseResponse/base.response';
import { LoginResponse } from '../dtos/response/users/login.response';
import { UserDetailsResponse } from '../dtos/response/users/userDetails.response';
import { environment } from './../environments/environment';
import { StorageService } from './storage.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private loginUrl: string = `${environment.apiUrl}/login`;
  private getMyInfoUrl: string = `${environment.apiUrl}/users/getMyInfo`;
  private apiConfig = {
    headers: this.createHeaders(),
  };

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private storageService: StorageService
  ) {}

  private createHeaders(): HttpHeaders {
    return new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  login(loginDTO: LoginDTO): Observable<BaseResponse<LoginResponse>> {
    return this.http.post<BaseResponse<LoginResponse>>(
      this.loginUrl,
      loginDTO,
      this.apiConfig
    );
  }

  isLoggedIn(): boolean {
    const token = this.storageService.get('access-token');
    return token !== null && !this.tokenService.isTokenExpired();
  }

  getMyInfo(): Observable<BaseResponse<UserDetailsResponse>> {
    return this.http.get<BaseResponse<UserDetailsResponse>>(
      this.getMyInfoUrl,
      this.apiConfig
    );
  }

  saveUserDetails(userDetails: UserDetailsResponse) {
    this.storageService.set('user-details', JSON.stringify(userDetails));
  }

  getUserDetailsFromLocalStorage(): UserDetailsResponse {
    const userDetails = this.storageService.get('user-details');
    return JSON.parse(userDetails || '{}');
  }
}
