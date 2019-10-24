import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeerStyleComponent } from './beer-style.component';

describe('BeerStyleComponent', () => {
  let component: BeerStyleComponent;
  let fixture: ComponentFixture<BeerStyleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeerStyleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeerStyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
