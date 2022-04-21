import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 1, name: 'book', description:'voila',  prix: 4500},
      { id: 2, name: 'pencil', description:'voila',  prix: 1},
      { id: 3, name: 'pen', description:'voila',  prix: 1.2},
      { id: 4, name: 'stylo', description:'voila',  prix: 457},
      { id: 5, name: 'pomme', description:'voila',  prix: 12},
    ];
    return {heroes};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}
