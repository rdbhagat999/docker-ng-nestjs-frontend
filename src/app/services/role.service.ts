import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AbstractService } from './abstract.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService extends AbstractService {
  protected endpoint = `${environment.apiURL}/api/roles`;

  constructor(protected readonly http: HttpClient) {
    super(http);
   }
}
