import { Component, HostListener, OnInit } from '@angular/core';
import { ServicioService } from '../servicio.service';
import { Juego } from '../model/juego';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';


@Component({
  selector: 'app-juegoimagen',
  templateUrl: './juegoimagen.component.html',
  styleUrls: ['./juegoimagen.component.css']
})
export class JuegoimagenComponent implements OnInit {
  titulo: string = 'guess gameplay';
  datos!: Juego[];
  respuesta: string = '';
  vidas: number = 0;
  mensajeResultado: string = '';
  puntos: number=0;
  listaJuegos: string[] = [];
  juegoControl = new FormControl();
  juegosFiltrados!: Observable<string[]>;
  
  mensajePerderVida: string = '';
  mensajeganar: string = '';
  numeroAleatorio: number = 0;
  palabrasecreta: string = '';
  nombresJuegos: Array<{ nombre: string; imagenes: string[] }> = [];
  mensajePerder: string = '';

  ngOnInit() {

    const listaJuegosCookie = this.cookieService.get('listajuegos');
  if (listaJuegosCookie) {
    this.listaJuegos = JSON.parse(listaJuegosCookie);
  }
    
    const puntoscookie = this.cookieService.get('puntos');
    this.puntos = parseInt(puntoscookie, 10) || 0;



    this.juegosFiltrados = this.juegoControl.valueChanges.pipe(
      startWith(''),
      map((value) => this.filtrarJuegos(value))
    );
    
  }

  constructor(
    private servicioService: ServicioService,
    private cookieService: CookieService,
    private router: Router
  ) {
    const sessionCookieExists = this.cookieService.check('game');
    if (!sessionCookieExists) {
      this.servicioService.getDatosJuego().subscribe((datos) => {
        this.datos = datos;
        this.generarArrayNombresJuegos();
        this.seleccionarPalabraSecreta();
      });
    } else {
      const nombresJuegosCookie = this.cookieService.get('game');
      this.nombresJuegos = JSON.parse(nombresJuegosCookie);
      const numeroAleatorioCookie = this.cookieService.get('numero');
      this.numeroAleatorio = parseInt(numeroAleatorioCookie, 10);
      const nombrejuegocookie = this.cookieService.get('palabra');
      this.palabrasecreta = nombrejuegocookie;
      const vidascookie = this.cookieService.get('vidas');
      this.vidas = parseInt(vidascookie, 10);
    }
    this.juegosFiltrados = this.juegoControl.valueChanges.pipe(
      map(value => value ? this.filtrarJuegos(value) : this.listaJuegos)
    );
  }

 
  generarNumeroAleatorio(max: number) {
    return Math.floor(Math.random() * max);
  }

  seleccionarPalabraSecreta() {
    const nombresJuegosCookie = this.cookieService.get('game');
    this.nombresJuegos = JSON.parse(nombresJuegosCookie);

    if (!this.nombresJuegos || this.nombresJuegos.length === 0) {

      const nombreuser = this.cookieService.get('session');
const nuevo = {
  nombre: nombreuser,
  puntos: this.puntos
};

this.servicioService.postDatoRanking(nuevo).subscribe((datos) => {
  console.log("Datos enviados al servidor:", datos);
});


      this.router.navigate(['/ranking']);
      return;
    }
    const longitudArray = this.nombresJuegos.length;
    const numeroAleatorio = this.generarNumeroAleatorio(longitudArray);
    this.numeroAleatorio = numeroAleatorio;
    this.palabrasecreta = this.nombresJuegos[numeroAleatorio].nombre;
    const currentDate = new Date();
    const expirationDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      currentDate.getDate()
    );
    const puntoscookie = this.cookieService.get('puntos');
      this.puntos = parseInt(puntoscookie, 10);
    this.cookieService.set('palabra', this.palabrasecreta, expirationDate);
    this.cookieService.set('numero', numeroAleatorio.toString(), expirationDate);
    this.cookieService.set('vidas', '5', expirationDate);
    location.reload();
  }

  enviarRespuesta() {
    const gameCookie = this.cookieService.get('game');
    if (!gameCookie ) {
      this.mensajeganar = 'Has acertado todos los juegos.';
      return;
    }
    this.palabrasecreta = this.cookieService.get('palabra');
    const juegoActual = this.palabrasecreta;
    if (this.respuesta.toLowerCase() === juegoActual.toLowerCase()) {
      this.mensajeResultado = '¡Respuesta correcta!';
      this.mensajePerderVida="";

      const gameData = JSON.parse(gameCookie);
      const numero = parseInt(this.cookieService.get('numero'), 10);

      const puntoscookie = this.cookieService.get('puntos');
      this.puntos = parseInt(puntoscookie, 10);
      const vidascookie = this.cookieService.get('vidas');
      this.vidas = parseInt(vidascookie, 10);

      if(this.vidas==5){
        this.puntos+=5;

      }else if(this.vidas==4){
        this.puntos+=4;
      }else if(this.vidas==3){
        this.puntos+=3;
      }else if(this.vidas==2){
        this.puntos+=2;
      }else{
        this.puntos+=1;
      }
      const currentDate = new Date();
    const expirationDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      currentDate.getDate()
    );

      this.cookieService.set('vidas', this.vidas.toString(), expirationDate);
      this.cookieService.set('puntos', this.puntos.toString(), expirationDate);



      if (Array.isArray(gameData) && numero >= 0 && numero < gameData.length) {
        gameData.splice(numero, 1);
        const updatedGameCookie = JSON.stringify(gameData);
        const currentDate = new Date();
        const expirationDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + 1,
          currentDate.getDate()
        );
        this.cookieService.set('game', updatedGameCookie, expirationDate);
      }
    } else {
      this.vidas--;
      const currentDate = new Date();
      const expirationDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        currentDate.getDate()
      );
      this.cookieService.set('vidas', this.vidas.toString(), expirationDate);
      if (this.vidas <= 0) {
        this.mensajePerder = 'Has perdido todas tus vidas. Intenta de nuevo.';
        const nombreuser = this.cookieService.get('session');
        const nuevo = {
          nombre: nombreuser,
          puntos: this.puntos
        };

        this.servicioService.postDatoRanking(nuevo).subscribe((datos) => {
          console.log("Datos enviados al servidor:", datos);
        });

      } else {
        this.mensajePerderVida = `Respuesta incorrecta. Te quedan ${this.vidas} vidas.`;
       
      }
    }
    this.respuesta = '';
  }

  generarArrayNombresJuegos() {
    this.nombresJuegos = [];
    for (const juego of this.datos) {
       const nombreJuego = juego.nombre;
      const imagenesJuego = juego.imagenes.slice(0, 5).filter((imagen) => imagen !== null) as string[];
      const juegoObjeto = {
        nombre: nombreJuego,
        imagenes: imagenesJuego
      };
      this.nombresJuegos.push(juegoObjeto);
    }
    for (const juego of this.datos) {
      const nombreJuego = juego.nombre;
      this.listaJuegos.push(nombreJuego);
    }

    const currentDate = new Date();
    const expirationDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate());
    this.cookieService.set('game', JSON.stringify(this.nombresJuegos), expirationDate);
    this.cookieService.set('vidas', '5', expirationDate);
    this.cookieService.set('listajuegos', JSON.stringify(this.listaJuegos), expirationDate);
    this.cookieService.set('puntos', "0", expirationDate);
    location.reload();
  }

  goToSlide(index: number) {
    const carouselElement = document.getElementById('carouselExampleControls');
    if (carouselElement) {
      carouselElement.classList.remove('slide');
      setTimeout(() => {
        carouselElement.classList.add('slide');
        carouselElement.querySelector('.active')?.classList.remove('active');
        carouselElement.querySelectorAll('.carousel-item')[index]?.classList.add('active');
      }, 50);
    }
  }

   reiniciar() {
    document.cookie = `game=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    location.reload();
  }
  seleccionarJuego(juego: string) {
    this.juegoControl.setValue(juego);
  }
  filtrarJuegos(keyword: string): string[] {
    return this.listaJuegos.filter(juego => juego.toLowerCase().includes(keyword.toLowerCase()));
  }
  
}
