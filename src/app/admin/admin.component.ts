import { Component } from '@angular/core';
import { ServicioService } from '../servicio.service';
import { Usuario } from '../model/usuario';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  datos!: Usuario[];

  constructor(private servicioService: ServicioService) {

    servicioService.getDatosUsuario().subscribe(datos=>this.datos=datos);
  }

}
