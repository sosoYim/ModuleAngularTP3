import { Component, computed, inject, input, linkedSignal } from '@angular/core';
import { form, FormField, FormRoot, required } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { Activite } from '../services/activite';

@Component({
  imports: [FormRoot, FormField],
  selector: 'app-consult-activite',
  styleUrl: './consult-activite.scss',
  templateUrl: './consult-activite.html',
})
export class ConsultActivite {
  // TP5 1.7: 목표 목록을 가진 서비스 주입 (Home, About과 같은 인스턴스)
  private readonly activiteService = inject(Activite);

  // TP5 1.8: 삭제 후 메인 페이지로 이동하기 위한 라우터
  private readonly monRouteur = inject(Router);

  // TP4 4.7: 경로 파라미터를 input()으로 받음
  // (TP의 ActivatedRoute.snapshot.params 대신, withComponentInputBinding으로 자동 연결)
  // 파라미터가 없으면 undefined
  readonly id = input<string>();
  readonly id2 = input<string>();

  // TP5 1.7: URL 파라미터는 항상 문자열이므로 숫자 인덱스로 변환 ('1' -> 1)
  protected readonly index = computed(() => Number(this.id()));

  // TP5 1.7: 인덱스로 서비스 배열에서 활동을 찾음
  // computed라서 id가 바뀌거나 목록이 바뀌면 자동으로 다시 계산됨 (컴포넌트가 재사용되어도 안전)
  // 없는 인덱스(범위 밖, 숫자가 아님)면 undefined
  protected readonly activite = computed(() => this.activiteService.objectifs()[this.index()]);

  // TP5 1.8: 삭제할 요소의 인덱스를 받아 서비스에서 삭제한 뒤 메인 페이지로 이동
  protected supprimeElem(index: number): void {
    this.activiteService.removeItem(index);
    this.monRouteur.navigate(['/']);
  }

  // TP5 1.9: 편집 모드 여부
  // linkedSignal: 다른 활동(index)으로 이동하면 자동으로 false로 초기화
  // -> 라우터가 컴포넌트를 재사용해도 편집 모드가 다음 활동으로 넘어가지 않음
  protected readonly enEdition = linkedSignal({
    source: this.index,
    computation: () => false,
  });

  private readonly titreEdite = linkedSignal(() => this.activite() ?? '');

  protected readonly titreForm = form(
    this.titreEdite,
    (titre) => {
      required(titre, { message: 'Le titre ne peut pas être vide.' });
    },
    {
      submission: {
        action: async () => this.sauvegarder(),
      },
    },
  );

  protected modifier(): void {
    this.enEdition.set(true);
  }

  private sauvegarder(): void {
    this.activiteService.updateItem(this.index(), this.titreEdite());
    this.enEdition.set(false);
  }

  protected retour(): void {
    this.monRouteur.navigate(['/']);
  }
}
