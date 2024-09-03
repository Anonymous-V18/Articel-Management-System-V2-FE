import { Injectable } from '@angular/core';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private readonly TOKEN_KEY = 'access-token';

  constructor(private storageService: StorageService) {}

  getToken(): string | null {
    return this.storageService.get(this.TOKEN_KEY);
  }

  saveToken(token: string): void {
    this.storageService.set(this.TOKEN_KEY, token);
  }

  removeToken(): void {
    this.storageService.remove(this.TOKEN_KEY);
  }

  isTokenExpired(): boolean {
    const token = this.getToken();

    if (!token) return true;

    const payloadToken = jwtDecode<JwtPayload>(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return payloadToken.exp ? currentTime >= payloadToken.exp : true;
  }
}
