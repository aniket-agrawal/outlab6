import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';
import { Feed } from './feed';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})

export class DataService {
  


  constructor(private http: HttpClient) { }

  private url = 'https://cs251-outlab-6.herokuapp.com/initial_values/';
  private url1 = 'https://cs251-outlab-6.herokuapp.com/add_new_feedback/';

  getData(): Observable<Feed> {
    return this.http.get<Feed>(this.url);
  }

  postData(feed: Feed): Observable<Feed> {
    return this.http.post<Feed>(this.url1, feed, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse){
    window.alert("Submission Unsuccessful");
    return throwError('Unsuccessful');
  }


}
