import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

	getAllEmployies = (data: any): Observable<any> => {
		const endpoint = environment.backendUrl + '/api/employee/getAllEmployee';
		return this.http.post(endpoint, data).pipe(
			catchError((err) => {
				return throwError(err);
			})
		);
	};

  addEmployee = (data: any): Observable<any> => {
		const endpoint = environment.backendUrl + '/api/employee/addEmployee';
		return this.http.post(endpoint, data).pipe(
			catchError((err) => {
				return throwError(err);
			})
		);
	};

	getEmployeeById = (data: any): Observable<any> => {
		const endpoint = environment.backendUrl + '/api/employee/getEmployeeWithId';
		return this.http.post(endpoint, data).pipe(
			catchError((err) => {
				return throwError(err);
			})
		);
	};

	editEmployee = (data:any,Id:any): Observable<any> => {
    let endpoint = environment.backendUrl+'/api/employee/editEmployeedata';
    if (Id) {
      endpoint += `?id=${Id}`;
    }
    return this.http.post(endpoint, data).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

	deleteemployee = (data:any): Observable<any> => {
    const endpoint = environment.backendUrl+'/api/employee/deleteemployee';
    return this.http.post(endpoint, data).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };
}
