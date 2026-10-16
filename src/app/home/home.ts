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

  // TP4 1.4: 입력 폼 표시 여부
  protected readonly formVisible = signal(false);

  // 폼 데이터 모델: 입력값의 단일 진실 공급원(single source of truth)
  private readonly objectifModel = signal<ObjectifFormModel>({ objectifText: '' });

  // 모델로부터 만든 필드 트리: 검증 규칙과 제출 처리를 함께 정의
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

  protected toggleForm(): void {
    this.formVisible.update((visible) => !visible);
  }

  private ajoutItem(objectif: string): void {
    this.objectifs.update((list) => [...list, objectif]);
  }
}
