import { Service, signal } from '@angular/core';

@Service()
export class Activite {
  // TP5 1.3: Home에 있던 목표 목록을 서비스로 이동
  private readonly _objectifs = signal<string[]>([]);

  // 컴포넌트에는 읽기 전용으로 공개 (수정은 아래 메서드를 통해서만 가능)
  readonly objectifs = this._objectifs.asReadonly();

  addItem(objectif: string): void {
    this._objectifs.update((list) => [...list, objectif]);
  }
}
