import { Component, inject, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IUser } from '../../interfaces/iuser.interface';
import { UsersService } from '../../services/users.service';
import { toast } from 'ngx-sonner';
import { DEFAULT_INTERPOLATION_CONFIG } from '@angular/compiler';

@Component({
  selector: 'app-buttons',
  imports: [RouterLink],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.css',
})
export class ButtonsComponent {
  @Input() user: IUser = {
    _id: '',
    id: 0,
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    image: '',
    password: '',
  };
  @Input() atView: Boolean = false;
  usersService = inject(UsersService);
  router = inject(Router);

  deleteUser(id: string): void {
    toast(`¿Borrar ${this.user.first_name} ${this.user.last_name}?`, {
      action: {
        label: 'Aceptar',
        onClick: async () => {
          await this.usersService.deleteById(id);
          this.router.navigate(['/dashboard', 'empleados']);
          toast.success('Borrado!');
        },
      },
      cancel: {
        label: 'Cancelar',
        onClick: () => {
          console.log('User deletion cancelled');
        },
      },
      duration: 7500,
      dismissible: true,
    });
  }
}
