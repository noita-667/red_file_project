import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Client {
  id: number;
  nom: string;
  age: number | null;
  email: string | null;
  ville: string | null;
  telephone: string | null;
}

export interface Vente {
  id: number;
  produit: string;
  quantite: number | null;
  prix: number | null;
  code_promo: string | null;
}

export interface Transaction {
  id: number;
  montant: number | null;
  statut: string | null;
  date_op: string | null;
  reference: string | null;
}

export interface ClientDetail {
  client: Client;
  ventes: Vente[];
  transactions: Transaction[];
}

@Injectable({ providedIn: 'root' })
export class ClientsService {
  private readonly apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.apiUrl}/clients`);
  }

  getClientDetail(id: number): Observable<ClientDetail> {
    return this.http.get<ClientDetail>(`${this.apiUrl}/clients/${id}`);
  }
}
