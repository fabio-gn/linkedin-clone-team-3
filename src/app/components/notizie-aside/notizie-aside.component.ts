import { Component } from '@angular/core';

@Component({
  selector: 'app-notizie-aside',
  templateUrl: './notizie-aside.component.html',
  styleUrls: ['./notizie-aside.component.scss']
})
export class NotizieAsideComponent {

  arrayNotizie = [
    {
      titolo: "lorem ipsum dolor aia che male oiiii",
      data: "oggi"
    },
    {
      titolo: "Hanno ucciso l'uomo ragno! chi è stato?",
      data: "ieri"
    },
    {
      titolo: "Tutti i giovani lo fanno, scopri perché",
      data: "ieri l'altro"
    },
    {
      titolo: "Cifa segretario del PD: e adesso?",
      data: "03/03/3333"
    }

  ]
}
