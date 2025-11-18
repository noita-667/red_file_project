import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-analyze',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './analyze.component.html',
  styleUrls: ['./analyze.component.css'],
})
export class AnalyzeComponent {
  table = 'inconnue';

  constructor(private route: ActivatedRoute, private router: Router) {
    const param = this.route.snapshot.paramMap.get('table');
    if (param) {
      this.table = param;
    }
  }

  nettoyer() {
    this.router.navigate(['/clean', this.table]);
  }
}
