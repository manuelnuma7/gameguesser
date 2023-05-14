import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioComponent } from './usuario/usuario.component';
import { JugarComponent } from './jugar/jugar.component';
import { PrincipalComponent } from './principal/principal.component';
import { RankingComponent } from './ranking/ranking.component';
import { NewlogComponent } from './newlog/newlog.component';
import { JuegoimagenComponent } from './juegoimagen/juegoimagen.component';


const routes: Routes = [
  { path: 'usuario', component: UsuarioComponent },
  { path: 'ranking', component: RankingComponent },
  { path: 'jugar', component: JugarComponent },
  { path: 'principal', component: PrincipalComponent },
  { path: 'newlog', component: NewlogComponent },
  { path: 'imagesgame', component: JuegoimagenComponent },

  { path: "", pathMatch: 'prefix', redirectTo: 'principal' },
  { path: '**', redirectTo: 'principal'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
