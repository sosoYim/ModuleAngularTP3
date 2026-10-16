import { Service, signal } from '@angular/core';

@Service()
export class Activite {
  // readonly string[]: 배열 내용 자체도 직접 바꾸지 못하게 타입으로 막음 (push/splice 등 컴파일 오류)
  private readonly _objectifs = signal<readonly string[]>([]);

  // 컴포넌트에는 읽기 전용으로 공개 (수정은 아래 메서드를 통해서만 가능)
  readonly objectifs = this._objectifs.asReadonly();

  addItem(objectif: string): void {
    this._objectifs.update((list) => [...list, objectif]);
  }

  // TP5 1.8: 인덱스 위치의 목표 1개 삭제
  // 조심: 원본 배열에 splice를 직접 쓰면 참조가 그대로라 signal이 변경을 알아채지 못함 -> 타입으로 막아 봄
  removeItem(index: number): void {
    this._objectifs.update((list) => {
      const copie = [...list];
      copie.splice(index, 1);
      return copie;
    });
  }

  updateItem(index: number, titre: string): void {
    this._objectifs.update((list) => list.map((objectif, i) => (i === index ? titre : objectif)));
  }
}
