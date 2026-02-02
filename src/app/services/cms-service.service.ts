import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServiceUrl } from 'src/assets/app.config.js';

@Injectable({
  providedIn: 'root',
})
export class CmsServiceService {
  private readonly _search = ServiceUrl.SEARCH_GUESTS;
  private readonly guests = ServiceUrl.GUESTS;
  private readonly candidates = ServiceUrl.ALL_CONTESTANTS;
  constructor(private http: HttpClient) {}

  search(params: any) {
    return this.http.get(this._search, { params });
  }
  guest(params: any) {
    return this.http.get(this.guests, { params });
  }

  participants(params: any) {
    return this.http.get(this.candidates, { params });
  }
}
