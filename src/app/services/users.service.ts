import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { IResponse } from '../interfaces/iresponse.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private endPoint: string = 'https://peticiones.online/api/users';
  private httpClient = inject(HttpClient);

  getAll(url: string, page: number = 1) {
    if (!url) {
      url = this.endPoint + '?page=' + page;
    }
    return lastValueFrom(this.httpClient.get<IResponse>(url));
  }
}
