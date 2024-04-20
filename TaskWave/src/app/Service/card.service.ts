import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Card } from '../Model/model';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  @Input() card!: Card;

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
  addCard(card : Partial<Card>) : Observable<Card> {
    return this.http.post<Card>(this.serviceURL, card);
  }

  // update Card
  updateCard(card : Partial<Card>) : Observable<Card>  {
	  return this.http.put<Card>(this.serviceURL + '/' + card.id, card);
  }

  // delete Card

  deleteCard(id : number) {
	  return this.http.delete(this.serviceURL + '/' + id);
  }
  
  // return a list of cards
  convertIdListToCardList(idList : number[]) : Card[] {
    let cardList : Card[] = [];
    idList.forEach(id => {
      this.getCardById(id).subscribe((data : Card) => {
        cardList.push(data);
        cardList.sort((a, b) => a.position - b.position);
      })
    });
    return cardList;
  }
}
