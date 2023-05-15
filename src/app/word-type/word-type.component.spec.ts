import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordTypeComponent } from './word-type.component';

describe('WordTypeComponent', () => {
  let component: WordTypeComponent;
  let fixture: ComponentFixture<WordTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WordTypeComponent]
    });
    fixture = TestBed.createComponent(WordTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
