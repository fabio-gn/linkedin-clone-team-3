import { Component } from '@angular/core';

@Component({
  selector: 'app-consigliatoperte',
  templateUrl: './consigliatoperte.component.html',
  styleUrls: ['./consigliatoperte.component.scss']
})
export class ConsigliatoperteComponent {





  cards = [
  {
    title: "Dove lavori attualmente?",
    description: "Gli utenti che includono almeno una posizione lavorativa ricevono fino a 3,5 volte più visualizzazioni del profilo.",
    buttonText: "Aggiungi posizione",
    imgLink: "../../../assets/img/consigliati-card-img-1.png"
  },
  {
    title: "In quale settore lavori?",
    description: "Gli utenti che aggiungono un settore ricevono fino a 2,5 volte più visualizzazioni del profilo.",
    buttonText: "Aggiungi settore",
    imgLink: "../../../assets/img/consigliati-card-img-2.png"
  },
  {
    title: "Aggiungi una foto al tuo profilo per aiutare gli altri a riconoscerti",
    description: "Gli utenti con una foto del profilo ricevono fino a 2,3 volte più visualizzazioni del profilo.",
    buttonText: "Aggiungi foto",
    imgLink: "../../../assets/img/consigliati-card-img-3.png"
  },
  {
    title: "Aggiungi le tue competenze per mostrare la tua esperienza",
    description: "Gli utenti che indicano almeno una competenza ricevono fino a 4 volte più visualizzazioni del profilo.",
    buttonText: "Aggiungi competenza",
    imgLink: "../../../assets/img/consigliati-card-img-4.png"
  },
  {
    title: "Scrivi un riepilogo per mettere in evidenza la tua personalità o la tua esperienza lavorativa",
    description: "Gli utenti che includono un riepilogo ricevono fino a 3,9 volte più visualizzazioni del profilo.",
    buttonText: "Aggiungi un riepilogo",
    imgLink: "../../../assets/img/consigliati-card-img-5.png"
  },
  ]
}
