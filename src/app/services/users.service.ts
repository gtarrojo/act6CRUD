import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { IResponse } from '../interfaces/iresponse.interface';
import { IUser } from '../interfaces/iuser.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private endPoint: string = 'https://peticiones.online/api/users';
  private httpClient = inject(HttpClient);

  getByPage(page: number): Promise<IResponse> {
    const url = this.endPoint + '?page=' + page;

    return lastValueFrom(this.httpClient.get<IResponse>(url));
  }

  getById(id: string): Promise<IUser> {
    const url = this.endPoint + '/' + id;
    return lastValueFrom(this.httpClient.get<IUser>(url));
  }

  deleteById(id: string): Promise<IUser> {
    const url = this.endPoint + '/' + id;
    return lastValueFrom(this.httpClient.delete<IUser>(url));
  }
}
