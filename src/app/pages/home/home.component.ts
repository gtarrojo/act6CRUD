import { Component, inject } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { UsersService } from '../../services/users.service';
import { IResponse } from '../../interfaces/iresponse.interface';
import { NavComponent } from '../../shared/nav/nav.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [NavComponent, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
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
