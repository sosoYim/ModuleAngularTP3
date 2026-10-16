import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-home',
  styleUrl: './home.scss',
  templateUrl: './home.html',
})
export class Home implements OnInit {
  nbItems: number = 4;
  btnText: string = 'Ajouter un item';
  objectifText: string = '';
  objectifs: string[] = [];

  ngOnInit(): void {
    this.nbItems = this.objectifs.length;
  }

  ajoutItem(): void {
    this.objectifs.push(this.objectifText);
    this.objectifText = '';
    this.nbItems = this.objectifs.length;
  }
}
