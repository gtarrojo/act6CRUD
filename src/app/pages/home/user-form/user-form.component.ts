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
  usersForm: FormGroup = new FormGroup({}, []);
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

  title: string = 'Registrar';
  button: string = 'Registrar';
  userService = inject(UsersService);
  router = inject(Router);

  ngOnInit() {
    this.loadUserData();
  }

  async loadUserData() {
    if (this.idUser) {
      try {
        this.user = await this.userService.getById(this.idUser);
        this.title = 'Actualizar';
        this.button = 'Actualizar';
      } catch (msg: any) {
        toast.error(msg.error);
      }
    }
    this.initForm();
  }

  initForm() {
    this.usersForm = new FormGroup(
      {
        first_name: new FormControl(this.user.first_name || '', [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ]),
        last_name: new FormControl(this.user.last_name || '', [
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
        image: new FormControl(this.user.image || '', [
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
        this.usersForm.get(controlName)?.dirty)
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

  submit() {
    let response: IUser | any;
  }
}
