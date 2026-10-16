import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { form, FormField, FormRoot, required } from '@angular/forms/signals';
import { Activite } from '../services/activite';

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
  // TP4 4.3: Router 주입 (TP의 생성자 매개변수 방식 대신 최신 권장 방식인 inject() 사용)
  // constructor(private monRouteur: Router) {}
  // 가독성, 타입 추론, 상속
  private readonly monRouteur = inject(Router);

  // TP5 1.2 (앱 전체에서 같은 인스턴스 하나를 공유)
  private readonly activiteService = inject(Activite);

  protected readonly btnText = signal('Ajouter un item');
  // TP5 1.3: 목록은 서비스가 보관하고, Home은 같은 signal을 참조만 함 (복사본을 만들지 않음)
  protected readonly objectifs = this.activiteService.objectifs;
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
          // TP4 4.4: 항목 추가 1초 후 about 페이지로 이동
          setTimeout(() => this.monRouteur.navigate(['/about']), 1000);
        },
      },
    },
  );

  protected toggleForm(): void {
    this.formVisible.update((visible) => !visible);
  }

  private ajoutItem(objectif: string): void {
    // TP5 1.3: 목록 수정은 서비스의 메서드를 통해 수행
    this.activiteService.addItem(objectif);
  }
}
