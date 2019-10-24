import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardBeerComponent } from './board-beer.component';

describe('BoardBeerComponent', () => {
  let component: BoardBeerComponent;
  let fixture: ComponentFixture<BoardBeerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardBeerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardBeerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
