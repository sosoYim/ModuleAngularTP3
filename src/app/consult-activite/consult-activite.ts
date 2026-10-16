import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-consult-activite',
  styleUrl: './consult-activite.scss',
  templateUrl: './consult-activite.html',
})
export class ConsultActivite {
  // TP4 4.7: 경로 파라미터를 input()으로 받음
  // (TP의 ActivatedRoute.snapshot.params 대신, withComponentInputBinding으로 자동 연결)
  // 파라미터가 없으면 undefined
  readonly id = input<string>();
  readonly id2 = input<string>();
}
