import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent {
  usuario: string;

  constructor(private cookieService: CookieService) {
    this.usuario = '';
    const sessionCookieExists = this.cookieService.check('session');
    if (sessionCookieExists) {
      this.usuario = this.cookieService.get('session');
    } else {
      // Redireccionar a la página de inicio de sesión si no hay una sesión activa
    }
  }

  cerrarSesion() {
    this.cookieService.delete('session');
    location.reload();
    // Redireccionar a la página de inicio de sesión u otra página adecuada después de cerrar sesión
  }


}
