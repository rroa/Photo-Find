// Angular
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {AuthHttp} from 'angular2-jwt';

// 3rd parties
import 'rxjs';

@Injectable()
export class SimpleHttp {
  constructor(private http: Http, private secureHttp: AuthHttp) {
  }

  get() {
    console.log('get');
    return this.http.get('/api')
      .map((response: Response) => {
        console.log('response', response);
        return response.json();
      });
  }

  secureGet() {
    console.log('get');
    return this.secureHttp.get('/api')
      .map((response: Response) => {
        console.log('response', response);
        return response.json();
      });
  }
}
