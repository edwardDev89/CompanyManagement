import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { company } from '../../model/company.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http:HttpClient) { }

  getAllCompanies(): Observable<company[]>{
    return this.http.get<company[]>(this.baseApiUrl + '/api/Company');
  }

  addCompany(addCompanyRequest:any): Observable<any>{
    return this.http.post<any>(this.baseApiUrl + '/api/Company', addCompanyRequest)
  }

  getCompany(id:string): Observable<company>{
    return this.http.get<company>(this.baseApiUrl + '/api/Company/' + id);
  }

  updateCompany(id:string, updateCompanyRequest: any): Observable<company>{
    return this.http.put<company>(this.baseApiUrl + '/api/Company/' + id, updateCompanyRequest);
  }

  deleteCompany(id:string): Observable<company>{
    return this.http.delete<company>(this.baseApiUrl + '/api/Company/' + id);
  }
}
