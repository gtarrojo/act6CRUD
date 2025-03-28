import { Component, inject } from '@angular/core';
import { IUser } from '../../../interfaces/iuser.interface';
import { UsersService } from '../../../services/users.service';
import { IResponse } from '../../../interfaces/iresponse.interface';
import { UserCardComponent } from '../../../components/user-card/user-card.component';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-users-list',
  imports: [UserCardComponent],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css',
})
export class UsersListComponent {
  arrUsers: IUser[] = [];
  userService = inject(UsersService);
  currentPage: number = 1;
  totalUsers: number = 999;
  allUsersLoaded: boolean = false;

  ngOnInit() {
    this.loadUsers();
  }

  async loadUsers() {
    try {
      let response: IResponse = await this.userService.getByPage(
        this.currentPage
      );

      if (this.currentPage === 1) {
        this.arrUsers = response.results;
        this.totalUsers = response.total;
      } else {
        this.arrUsers = [...this.arrUsers, ...response.results];
      }

      this.allUsersLoaded =
        response.total === this.arrUsers.length ? true : false;

      this.currentPage++;
    } catch (msg: any) {
      toast.error(msg.error);
    }
  }
}
