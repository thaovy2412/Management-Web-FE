import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) { }
  commitID = new BehaviorSubject<string>('');
  tool = new BehaviorSubject<string>('');

  fetchReport(path:string):Observable<any>{
    const url = `http://localhost:3000/data?path=${path}`;
    return this.http.get<any>(url);
  }

  setCommitID(id:string){
    this.commitID.next(id);
  }

  setTool(tool:string){
    this.tool.next(tool);
  }
}
