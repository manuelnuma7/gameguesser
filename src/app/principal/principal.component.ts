import { Component,ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../model/usuario';
import { ServicioService } from '../servicio.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements AfterViewInit {
  newloginForm!: FormGroup;
  newlogin!: Usuario;
  isLoggedIn = false;
  entrada:boolean=false;
  @ViewChild('welcomeMessageElement', { static: true }) welcomeMessageElement!: ElementRef;
  
  fallo:boolean=false;
  aceptarCookies = false;

  constructor(
    private servicioService: ServicioService,
    private fb: FormBuilder,
    private router: Router,
    private CookieService: CookieService,
  ) {
    this.newloginForm = this.fb.group({
    nombre: ['', [Validators.required]],
    clave: ['', [Validators.required]]
  })}
  
  get nombre() {
    return this.newloginForm.get('nombre');
  }

  get clave() {
    return this.newloginForm.get('clave');
  }
  ngAfterViewInit() {
    const sessionCookieExists = this.CookieService.check('session');
    if (sessionCookieExists) {
      const valorCookie = this.CookieService.get('session');
      if (this.welcomeMessageElement) { // Verificar si welcomeMessageElement está definido
        this.welcomeMessageElement.nativeElement.textContent = `Bienvenido ${valorCookie}`;
      }
      this.isLoggedIn = true;
    }
    const politicaCookieExists = this.CookieService.check('Politica');
    if (politicaCookieExists) {
      this.aceptarCookies = true;
    }
  }
  entradalogin() {
    this.newlogin = this.newloginForm.value;
    this.servicioService.login(this.newlogin).subscribe((data) => {
      console.log(data);
      if (data.length>0) { 
        const currentDate = new Date();
        const expirationDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate());
        this.CookieService.set('session', data[0].nombre,expirationDate);
        // this.welcomeMessageElement.nativeElement.textContent = `Bienvenido ${this.nombre}`;
        this.isLoggedIn = true;
         this.router.navigateByUrl('jugar');
      }
      else {this.fallo=true;}
    });

  }

  aceptarPoliticaCookies() {
    const currentDate = new Date();
    const expirationDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate());
    this.CookieService.set('Politica', 'aceptada', expirationDate);
    this.aceptarCookies = true;
  }
  
  rechazarPoliticaCookies() {
    // No hacer nada, simplemente cierra el div de aceptación de cookies
  }
  checkSessionCookie(): boolean {
    const sessionCookie = document.cookie.includes('Politica');
    return sessionCookie;
  }
  
  

}
