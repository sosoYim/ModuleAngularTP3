import { Component, computed, inject, input } from '@angular/core';
import { Activite } from '../services/activite';

@Component({
  imports: [],
  selector: 'app-consult-activite',
  styleUrl: './consult-activite.scss',
  templateUrl: './consult-activite.html',
})
export class ConsultActivite {
  // TP5 1.7: 목표 목록을 가진 서비스 주입 (Home, About과 같은 인스턴스)
  private readonly activiteService = inject(Activite);

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
}
