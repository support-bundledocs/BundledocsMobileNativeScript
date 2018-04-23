import { HttpClient } from '@angular/common/http';
// ...
export class AppComponent {
  constructor(public http: HttpClient) {}
  public ping() {
    this.http.get('"https://app.bundledocs.com/api/v1/users/me"')
      .subscribe(
        data => console.log(data),
        err => console.log(err)
      );
  }
}