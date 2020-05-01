import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecasComponent } from './forecas.component';

describe('ForecasComponent', () => {
  let component: ForecasComponent;
  let fixture: ComponentFixture<ForecasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForecasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForecasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
