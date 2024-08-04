import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PerformanceReviewService {
  private apiUrl = `${environment.apiUrl}/performance-review`;

  constructor(private http: HttpClient) {}

  getAllPerformanceReviews(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }

  getPerformanceReview(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  addPerformanceReview(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, data);
  }

  updatePerformanceReview(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }

  deletePerformanceReview(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
