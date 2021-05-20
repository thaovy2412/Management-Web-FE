import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DataReport } from '../models/commits';
import { environment } from "../../../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) { }
  commitID = new BehaviorSubject<string>('');
  tool = new BehaviorSubject<string>('');
  dataReport = new BehaviorSubject<DataReport[]>([]);

  // fetchDetailReport(id:string,tool:string):Observable<any>{
  //   const url = `http://localhost:3000/detailreport?commitid=${id}&tool=${tool}`;
  //   return this.http.get<any>(url);
  // }

  // fetchDataReport():Observable<DataReport[]>{
  //   const url = "http://localhost:3000/datareport";
  //   return this.http.get<DataReport[]>(url);
  // }

  fetchDetailReport(id:string,tool:string):Observable<any>{
    const url = `${environment.apiUrl}/detailreport?commitid=${id}&tool=${tool}`;
    return this.http.get<any>(url);
  }

  fetchDataReport():Observable<DataReport[]>{
    const url = `${environment.apiUrl}/datareport`;
    return this.http.get<DataReport[]>(url);
  }

  setCommitID(id:string){
    this.commitID.next(id);
  }

  setTool(tool:string){
    this.tool.next(tool);
  }
}
