import { Component, inject } from '@angular/core';
import { Activite } from '../services/activite';

@Component({
  imports: [],
  selector: 'app-about',
  styleUrl: './about.scss',
  templateUrl: './about.html',
})
export class About {
  // TP5 1.5
  private readonly activiteService = inject(Activite);

  protected readonly objectifs = this.activiteService.objectifs;
}
