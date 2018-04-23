import { Component } from "@angular/core";
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { NgModule } from '@angular/core';

@Component({
  selector: "ns-app",
  templateUrl: "app.component.html",
})
export class AppComponent { }

@NgModule({
  bootstrap: [AppComponent],
  imports: [],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
})
export class AppModule { }

