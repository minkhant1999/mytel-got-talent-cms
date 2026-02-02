import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServiceUrl } from 'src/assets/app.config.js';

@Injectable({
  providedIn: 'root',
})
export class CmsServiceService {
  private readonly _search = ServiceUrl.SEARCH_GUESTS;
  private readonly guests = ServiceUrl.GUESTS;
  constructor(private http: HttpClient) {}

  search(params: any) {
    return this.http.get(this._search, { params });
  }
  guest() {
    return this.http.get(this.guests);
  }
}
