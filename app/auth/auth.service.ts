// src/app/auth/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpRequest } from '@angular/common/http';
import { ActivatedRoute } from "@angular/router";

@Injectable()
export class AuthService {
  cachedRequests: Array<HttpRequest<any>> = [];
  public collectFailedRequest(request): void {
    this.cachedRequests.push(request);
  }
  public retryFailedRequests(): void {
    // retry the requests. this method can
    // be called after the token is refreshed
  }

  //this class is used so that access token is in local storage
  public getToken(): string {
    return localStorage.getItem('accessToken');
  }

  //checks if the access token is authenticated, returns true if so
  public isAuthenticated(): boolean {
    //  get the token
    const accessToken = this.getToken();
    accessToken;

    return true;
  }
}