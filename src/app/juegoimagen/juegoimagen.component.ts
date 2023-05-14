import { Component, HostListener } from '@angular/core';
import { ServicioService } from '../servicio.service';
import { Juego } from '../model/juego';


@Component({
  selector: 'app-juegoimagen',
  templateUrl: './juegoimagen.component.html',
  styleUrls: ['./juegoimagen.component.css']
})
export class JuegoimagenComponent {
  @HostListener('window:beforeunload', ['$event'])
  titulo: string = 'guess gameplay';
  datos!: Juego[];
  primerJuego: Juego | undefined;
  urlPrimeraImagen: string | undefined;
  respuesta: string = '';
  vidas: number = 5;
  mensajeResultado: string = '';
  nombresJuegos: string[] = [];

  constructor(private servicioService: ServicioService) {
    servicioService.getDatosJuego().subscribe(datos => {
      this.datos = datos;
      this.primerJuego = this.datos[5];
      this.urlPrimeraImagen = this.primerJuego.imagenes[0] || '';
      this.generarArrayNombresJuegos();
    });
  }

  enviarRespuesta() {
    const juegoActual = this.datos[0];
    if (this.respuesta.toLowerCase() === juegoActual.nombre) {
      this.mensajeResultado = '¡Respuesta correcta! Has ganado el juego.';
    } else {
      this.vidas--;
      if (this.vidas === 0) {
        this.mensajeResultado = 'Has perdido todas tus vidas. Intenta de nuevo.';
      } else {
        this.mensajeResultado = `Respuesta incorrecta. Te quedan ${this.vidas} vidas.`;
      }
    }
    this.respuesta = '';
  }
  handleBeforeUnload(event: Event) {
    const confirmationMessage = '¿Estás seguro de que deseas salir? El progreso del juego se perderá.';
    event.preventDefault();
    return confirmationMessage;
  }
  generarArrayNombresJuegos() {
    this.nombresJuegos = this.datos.map(juego => juego.nombre);
  }
}