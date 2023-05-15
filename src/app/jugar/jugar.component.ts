import { Component } from '@angular/core';

@Component({
  selector: 'app-jugar',
  templateUrl: './jugar.component.html',
  styleUrls: ['./jugar.component.css']
})
export class JugarComponent {
  checkSessionCookie(): boolean {
    const sessionCookie = document.cookie.includes('session');
    return sessionCookie;
  }

}
