import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServiceUrl } from 'src/assets/app.config.js';

@Injectable({
  providedIn: 'root',
})
export class CmsServiceService {
  private readonly _searchG = ServiceUrl.SEARCH_GUESTS;
  private readonly guests = ServiceUrl.GUESTS;
  private readonly candidates = ServiceUrl.ALL_CONTESTANTS;
  private readonly login = ServiceUrl.Login;
  private readonly _searchP = ServiceUrl.SEARCH_CONTESTANTS;
  constructor(private http: HttpClient) {}

  searchG(params: any) {
    return this.http.get(this._searchG, { params });
  }

  guest() {
    return this.http.get(this.guests);
  }
  participants() {
    return this.http.get(this.candidates);
  }
  searchP(params: any) {
    return this.http.get(this._searchP, { params });
  }

  login_service(body: any) {
    return this.http.post(this.login, body);
  }
}
