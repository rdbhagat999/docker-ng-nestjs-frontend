import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(protected readonly http: HttpClient) { }

  uploadFile(doc: File) {

    const data = new FormData();

    data.append('image', doc);

    return this.http.post(`${environment.apiURL}/api/uploads`, data);
  }
}
