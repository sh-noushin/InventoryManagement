import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from '@core/models/item.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private apiUrl = 'http://localhost:5141/api/items';

  constructor(private http: HttpClient) {}

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrl);
  }

  getItem(id: number): Observable<Item> {
    return this.http.get<Item>(`${this.apiUrl}/Get/${id}`);
  }

  addItem(itemName: string, description: string): Observable<Item> {
    return this.http.post<Item>(`${this.apiUrl}/Add?itemName=${itemName}&description=${description}`, {});
  }

  updateItem(id: number, itemName: string, description: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/Update/${id}?itemName=${itemName}&description=${description}`, {});
  }

  deleteItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/Delete/${id}`);
  }
}