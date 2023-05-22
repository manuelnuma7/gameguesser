import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { RankingComponent } from './ranking/ranking.component';
import { AdminComponent } from './admin/admin.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { JugarComponent } from './jugar/jugar.component';
import { PrincipalComponent } from './principal/principal.component';
import { NewlogComponent } from './newlog/newlog.component';

import { ServicioService } from './servicio.service';
import { CookieService } from 'ngx-cookie-service';
import { JuegoimagenComponent } from './juegoimagen/juegoimagen.component';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';




@NgModule({
  declarations: [
    AppComponent,
    RankingComponent,
    AdminComponent,
    UsuarioComponent,
    JugarComponent,
    PrincipalComponent,
    NewlogComponent,
    JuegoimagenComponent,
   
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
    
  ],
  providers: [ServicioService,CookieService, { provide: 'jspdf', useValue: jsPDF }  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
