import { Component } from '@angular/core';
import { ServicioService } from '../servicio.service';
import { Ranking } from '../model/ranking';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent {
  datos!: Ranking[];

  constructor(private servicioService: ServicioService) {

    servicioService.getDatosRanking().subscribe(datos=>this.datos=datos);
  }
  
  guardarRanking() {
    const doc = new jsPDF();
  
    const columns = ['Nombre', 'Puntos'];
    const data = this.datos.map(dato => [dato.nombre, dato.puntos.toString()]);
  
    const startY = 20;
    const columnSpacing = 40;
    const rowSpacing = 10;
    const fontSize = 12;
  
    doc.setFontSize(fontSize);
    doc.text(columns[0], columnSpacing, startY);
    doc.text(columns[1], columnSpacing + 60, startY);
  
    let currentY = startY + rowSpacing;
    data.forEach(row => {
      doc.text(row[0], columnSpacing, currentY);
      doc.text(row[1], columnSpacing + 60, currentY);
      currentY += rowSpacing;
    });
  
    doc.save('ranking.pdf');
  }


}
