import { Component, computed, signal } from '@angular/core';
import { form, FormField, FormRoot, required } from '@angular/forms/signals';

interface ObjectifFormModel {
  objectifText: string;
}

@Component({
  imports: [FormRoot, FormField],
  selector: 'app-home',
  styleUrl: './home.scss',
  templateUrl: './home.html',
})
export class Home {
  protected readonly btnText = signal('Ajouter un item');
  protected readonly objectifs = signal<string[]>([]);
  protected readonly nbItems = computed(() => this.objectifs().length);

  // Form data model: the single source of truth for the input value.
  private readonly objectifModel = signal<ObjectifFormModel>({ objectifText: '' });

  // Field tree built from the model, with validation rules and submit handling.
  protected readonly objectifForm = form(
    this.objectifModel,
    (path) => {
      required(path.objectifText, { message: 'Veuillez saisir un objectif.' });
    },
    {
      submission: {
        action: async (field) => {
          this.ajoutItem(field().value().objectifText);
          field().reset({ objectifText: '' });
        },
      },
    },
  );

  private ajoutItem(objectif: string): void {
    this.objectifs.update((list) => [...list, objectif]);
  }
}
