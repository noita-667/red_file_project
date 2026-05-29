import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TablesService } from './tables.service';
import { ClientsService, Client } from '../clients/clients.service';

@Component({
  selector: 'app-tables',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css'],
})
export class TablesComponent implements OnInit {
  tables: string[] = [];
  clients: Client[] = [];
  loading = true;
  error = '';

  constructor(
    private router: Router,
    private tablesService: TablesService,
    private clientsService: ClientsService
  ) {}

  ngOnInit() {
    this.tablesService.getTables().subscribe({
      next: (data) => {
        this.tables = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Impossible de charger les tables.';
        this.loading = false;
      },
    });

    this.clientsService.getClients().subscribe({
      next: (data) => this.clients = data,
      error: () => {},
    });
  }

  voirAnalyse(table: string) {
    this.router.navigate(['/analyze', table]);
  }

  voirCleaning(table: string) {
    this.router.navigate(['/clean', table]);
  }

  voirResume() {
    this.router.navigate(['/summary']);
  }

  voirClient(id: number) {
    this.router.navigate(['/clients', id]);
  }
}
