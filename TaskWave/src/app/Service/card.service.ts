import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Card } from '../Model/Card';
import { CardDTO } from '../Model/CardDTO';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(public http : HttpClient, private router : Router, private route : ActivatedRoute) { }

  serviceURL = 'http://localhost:3050/task';
  // crud operations

  // get all Card
  // getCards() : Observable<Card[]> {
	// return this.http.get<Card[]>(this.serviceURL);
  // }

  // get Card by wrapperId
  getCardById(id : number): Observable<Card> {
	  return this.http.get<Card>(this.serviceURL + '/' + id);
  }

  // add Card
  addCard(cardDTO : CardDTO) {
    this.http.post<Card>(this.serviceURL, cardDTO).subscribe(
      (data : Card) => {
      console.log(data);
      }
    );
    return this.router.navigate(['tab',cardDTO.wrapperId], { relativeTo: this.route });
  }

  // update Card
  updateCard(card : Card) : Observable<Card>  {
	  return this.http.put<Card>(this.serviceURL + '/' + card.id, card);
  }

  // delete Card

  deleteCard(id : number) {
	  return this.http.delete(this.serviceURL + '/' + id);
  }
}
