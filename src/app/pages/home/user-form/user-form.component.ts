import { Component, inject, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '../../../services/users.service';
import { Router } from '@angular/router';
import { IUser } from '../../../interfaces/iuser.interface';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent {
  @Input() idUser: string = '';
  user: IUser = {
    _id: '',
    id: 0,
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    image: '',
    password: '',
  };
  usersForm: FormGroup = new FormGroup({}, []);
  title: string = 'Registrar';
  userService = inject(UsersService);
  router = inject(Router);

  async ngOnInit() {
    if (this.idUser) {
      // llamamos al servicio y cargamos los datos del empleado
      try {
        this.user = await this.userService.getById(this.idUser);
        this.title = 'Actualizar';
      } catch (msg: any) {
        toast.error(msg.error);
      }
    }

    this.usersForm = new FormGroup(
      {
        nombre: new FormControl(this.user.first_name || '', []),
        apellidos: new FormControl(this.user.last_name || '', []),
        email: new FormControl(this.user.email || '', []),
        imagen: new FormControl(this.user.image || '', []),
      },
      []
    );
  }

  submit() {}
}
