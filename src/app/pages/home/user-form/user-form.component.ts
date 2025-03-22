import { Component, inject, Input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
  button: string = 'Registrar';
  userService = inject(UsersService);
  router = inject(Router);

  async ngOnInit() {
    if (this.idUser) {
      // llamamos al servicio y cargamos los datos del empleado
      try {
        this.user = await this.userService.getById(this.idUser);
        this.title = 'Actualizar';
        this.button = 'Actualizar';
      } catch (msg: any) {
        toast.error(msg.error);
      }
    }

    this.usersForm = new FormGroup(
      {
        nombre: new FormControl(this.user.first_name || '', [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ]),
        apellidos: new FormControl(this.user.last_name || '', [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100),
        ]),
        email: new FormControl(this.user.email || '', [
          Validators.required,
          Validators.pattern(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
          ),
        ]),
        imagen: new FormControl(this.user.image || '', [
          Validators.required,
          Validators.pattern(
            /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?$/
          ),
        ]),
      },
      []
    );
  }

  checkControl(controlName: string): boolean | undefined {
    return (
      this.usersForm.get(controlName)?.invalid &&
      (this.usersForm.get(controlName)?.touched ||
        this.usersForm.get('text')?.dirty)
    );
  }

  checkValid(controlName: string): boolean | undefined {
    return (
      this.usersForm.get(controlName)?.valid &&
      (this.usersForm.get(controlName)?.touched ||
        this.usersForm.get(controlName)?.dirty)
    );
  }

  checkCurrentError(
    controlName: string,
    errorName: string
  ): boolean | undefined {
    return (
      this.usersForm.get(controlName)?.hasError(errorName) &&
      this.usersForm.get(controlName)?.touched
    );
  }

  submit() {}
}
