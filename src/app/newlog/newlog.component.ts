import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Usuario } from '../model/usuario';
import { ServicioService } from '../servicio.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-newlog',
  templateUrl: './newlog.component.html',
  styleUrls: ['./newlog.component.css']
})
export class NewlogComponent {

  newusuario: Usuario = {
    id: 0,
    nombre: '',
    email: '',
    clave: '',
    admin: 0,
  };
  newusuarioForm!: FormGroup;
  public message: string = '';
  public clasec: string = '';
  public clases: string = 'text-info';
  resp: any;
  actuales$!: Observable<Usuario[]>;;

  constructor(
    private servicioService: ServicioService,
    private fb: FormBuilder
  ) {
    this.newusuarioForm = this.fb.group({
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required ]],
      clave: ['', [Validators.required ]],

    });
  }

  entradausuario() {
    if (this.newusuarioForm.invalid) {
      this.message = 'Por favor corrige los errores';
      this.clasec = 'text-danger';
    } else {
      this.clasec = 'text-success';
      this.newusuario = this.newusuarioForm.value;
      // this.message = `Entrada correcta: ${this.newusuario.nombre} ${this.newusuario.email} ${this.newusuario.clave}`;
      console.log('Entrada correcta', this.newusuario);
      this.servicioService
        .postDato(this.newusuario)
        .subscribe({
          next: resp => this.resp = resp,
          error: err => console.log(err),
          complete: () => this.actuales$=this.servicioService.getDatosUsuario()
        });
    }
  }

  get nombre() {
    return this.newusuarioForm.get('nombre');
  }

  get email() {
    return this.newusuarioForm.get('email');
  }
  get clave() {
    return this.newusuarioForm.get('clave');
  }

}
