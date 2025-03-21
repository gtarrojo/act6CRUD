import { Component, inject } from '@angular/core';
import { IUser } from '../../../interfaces/iuser.interface';
import { UsersService } from '../../../services/users.service';
import { IResponse } from '../../../interfaces/iresponse.interface';
import { UserCardComponent } from '../../../components/user-card/user-card.component';

@Component({
  selector: 'app-users-list',
  imports: [UserCardComponent],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css',
})
export class UsersListComponent {
  arrUsers: IUser[] = [];
  userService = inject(UsersService);

  ngOnInit() {
    this.loadUsers();
  }

  async loadUsers() {
    let response: IResponse = await this.userService.getAll('');
    this.arrUsers = response.results;
    console.log(this.arrUsers);
  }
}
