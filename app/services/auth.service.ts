// src/app/auth/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpRequest } from '@angular/common/http';
import { ActivatedRoute } from "@angular/router";
import 'nativescript-localstorage';

@Injectable()
export class AuthService {
  //getAccessToken class retrieves the access token from local storage 
  public getAccessToken(): string {
    return localStorage.getItem('accessToken');
  }

  //this sets the accessToken and passes it off to local storage 
  //so it can be used accross all components 
  public setAccessToken(accessToken): void {
    localStorage.setItem('accessToken', accessToken);
  }
}