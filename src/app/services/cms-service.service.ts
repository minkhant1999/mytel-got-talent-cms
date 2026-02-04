import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServiceUrl } from 'src/assets/app.config.js';
import { map } from 'rxjs';

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
  voteSwitch(enabled: boolean) {
    return this.http
      .post<any>(
        'http://10.201.234.189:8889/mytel-got-talent-voting-system/cms/auth/vote-switch',
        { enabled },
      )
      .pipe(
        map((res) => res.result.votingEnabled), // only return the boolean
      );
  }
}
