import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }


  get<T>(key: string): T | null {    
    let item: string | null = localStorage.getItem(key);
    let result: T | null = item ? JSON.parse(item) : null;
    return result;
  }

  set(key: string, value: any) {    
    localStorage.setItem(key, JSON.stringify(value));
  }

  remove(key: string) {    
    localStorage.removeItem(key);    
  }
}
