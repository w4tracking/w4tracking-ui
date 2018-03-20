import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { cloneDeep } from 'lodash';
import { User, UserService } from '../../ngx-login-client';
import { Logger } from '../../ngx-base';
import { Observable } from 'rxjs/Observable';

import { W4TRACKING_API_URL } from '../api/w4tracking-api';
import { Company } from '../models/company';

import 'rxjs/add/observable/from';
import 'rxjs/add/operator/distinct';

@Injectable()
export class CompanyService {

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private companiesUrl: string;

  private nextLinkOwnedNamedSpaces: string = null;
  private nextLinkOwnedCollaboratedSpaces: string = null;

  constructor(
    private http: HttpClient,
    private logger: Logger,
    private userService: UserService,
    @Inject(W4TRACKING_API_URL) apiUrl: string) {
    this.companiesUrl = apiUrl.endsWith('/') ? apiUrl + 'spaces' : apiUrl + '/spaces';
    this.companiesUrl = apiUrl.endsWith('/') ? apiUrl + 'users' : apiUrl + '/users';
  }

  /**
   * Get public version of space
   * @param spaceId spaceId
   */
  getSpaceById(spaceId: string): Observable<Company> {
    const url = `${this.companiesUrl}/${spaceId}`;
    return this.http.get(url, { headers: this.headers })
      .map((response) => {
        return response['data'] as Company;
      })
      .switchMap(val => this.resolveOwner(val))
      .catch((error) => {
        return this.handleError(error);
      });
  }

  /**
   * Create new company
   * @param company company
   */
  create(company: Company): Observable<Company> {
    const url = this.companiesUrl;
    const payload = JSON.stringify({ data: company });
    return this.http
      .post(url, payload, { headers: this.headers })
      .map(response => {
        return response['data'] as Company;
      })
      .switchMap(val => {
        return this.resolveOwner(val);
      })
      .catch((error) => {
        return this.handleError(error);
      });
  }

  update(company: Company): Observable<Company> {
    const url = `${this.companiesUrl}/${company.id}`;
    const payload = JSON.stringify({ data: company });
    return this.http
      .put(url, payload, { headers: this.headers })
      .map(response => {
        return response['data'] as Company;
      })
      .switchMap(val => {
        return this.resolveOwner(val);
      })
      .catch((error) => {
        return this.handleError(error);
      });
  }

  delete(company: Company): Observable<Company> {
    const url = `${this.companiesUrl}/${company.id}`;
    return this.http
      .delete(url, { headers: this.headers })
      .map(() => { })
      .catch((error) => {
        return this.handleError(error);
      });
  }

  /**
   * Private
   */

  private handleError(error: any) {
    this.logger.error(error);
    return Observable.throw(error.message || error);
  }

  private resolveOwner(company: Company): Observable<Company> {
    company.relationalData = company.relationalData || {};

    if (!company.relationships.ownedBy) {
      company.relationalData.owner = {} as User;
      return Observable.of(company);
    }

    return this.userService
      .getUserByUserId(company.relationships.ownedBy.data.id)
      .map(owner => {
        company.relationalData.owner = owner;
        return company;
      });
  }

}
