import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientsService, ClientDetail } from './clients.service';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
})
export class ClientsComponent implements OnInit {
  detail: ClientDetail | null = null;
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clientsService: ClientsService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.clientsService.getClientDetail(id).subscribe({
      next: (data) => {
        this.detail = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Client introuvable.';
        this.loading = false;
      },
    });
  }

  retourTables() {
    this.router.navigate(['/tables']);
  }
}
