import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export abstract class AbstractService {

  protected abstract endpoint = `${environment.apiURL}/api/users`;

  private page: number;
  private take: number;
  private last_page: number;

  constructor(protected readonly http: HttpClient) {
    this.page = 1;
    this.take = 15;
    this.last_page = 1;
   }

  all(page: number = 1, take: number = 15): Observable<any[]> {
    return this.http.get<any[]>(`${this.endpoint}?page=${page}&take=${take}`).pipe(
      map((res: any) => {

        this.last_page = res.meta.last_page;
        return res.data;

      })
    );
  }

  get(id: number): Observable<any> {
    return this.http.get<any>(`${this.endpoint}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post<any>(`${this.endpoint}`, data);
  }

  update(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.endpoint}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/${id}`);
  }

  nextPage() {

    if(this.page < this.last_page) {
      this.page += 1;
    }
    return this.all(this.page, this.take);

  }

  prevPage() {

    if(this.page > 1) {
      this.page -= 1;
    }
    return this.all(this.page, this.take);

  }

}
