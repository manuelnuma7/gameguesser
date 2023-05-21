import { Component, HostListener } from '@angular/core';
import { ServicioService } from '../servicio.service';
import { Juego } from '../model/juego';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-juegoimagen',
  templateUrl: './juegoimagen.component.html',
  styleUrls: ['./juegoimagen.component.css']
})
export class JuegoimagenComponent {
  titulo: string = 'guess gameplay';
  datos!: Juego[];
  respuesta: string = '';
  vidas: number = 0;
  mensajeResultado: string = '';
  mensajePerderVida: string = '';
  mensajeganar: string = '';
  numeroAleatorio: number = 0;
  palabrasecreta: string = '';
  nombresJuegos: Array<{ nombre: string; imagenes: string[] }> = [];
  mensajePerder: string = '';

  constructor(
    private servicioService: ServicioService,
    private cookieService: CookieService
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
  }

  generarNumeroAleatorio(max: number) {
    return Math.floor(Math.random() * max);
  }

  seleccionarPalabraSecreta() {
    const nombresJuegosCookie = this.cookieService.get('game');
    this.nombresJuegos = JSON.parse(nombresJuegosCookie);

    // al ranking
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

    const juegoActual = this.palabrasecreta;
    if (this.respuesta.toLowerCase() === juegoActual.toLowerCase()) {
      this.mensajeResultado = '¡Respuesta correcta!';
      const gameData = JSON.parse(gameCookie);
      const numero = parseInt(this.cookieService.get('numero'), 10);

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

    const currentDate = new Date();
    const expirationDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate());
    this.cookieService.set('game', JSON.stringify(this.nombresJuegos), expirationDate);
    this.cookieService.set('vidas', '5', expirationDate);
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

}
