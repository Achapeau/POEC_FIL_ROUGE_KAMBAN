import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Card } from '../Model/Card';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(public http : HttpClient) { }

  serviceURL = 'http://localhost:3050/task';
  // crud operations

  // get all Card
  getCards() : Observable<Card[]> {
	return this.http.get<Card[]>(this.serviceURL);
  }

  // get Card by id
  getCardById(id : number): Observable<Card> {
	return this.http.get<Card>(this.serviceURL + '/' + id);
  }

  // add Card
  addCard(card : Card) : Observable<Card> {
	return this.http.post<Card>(this.serviceURL, card);
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
