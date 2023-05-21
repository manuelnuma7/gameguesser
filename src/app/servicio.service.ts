import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from './model/usuario';
import { Juego } from './model/juego';
import { Ranking } from './model/ranking';
@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  url:string='http://localhost/ActsDwes/phpgameguesser/';

  constructor(private http: HttpClient) { }

  getDatosUsuario():  Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.url}usuario/leerUsuario.php`);
  }

  
  postDato(nuevo:Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.url}usuario/insertarUsuario.php`,nuevo);
  }

  login(user: Usuario): Observable<Usuario[]> {
    return this.http.post<Usuario[]>(`${this.url}usuario/loginUsuario.php`, user);
  }

  getDatosJuego():  Observable<Juego[]> {
    return this.http.get<Juego[]>(`${this.url}juego/leerJuegotry.php`);
  }

  postDatoRanking(nuevo: any): Observable<any> {
    return this.http.post(`${this.url}ranking/insertarRanking.php`, nuevo);
  }

  getDatosRanking():  Observable<Ranking[]> {
    return this.http.get<Ranking[]>(`${this.url}ranking/leerRanking.php`);
  }

}


