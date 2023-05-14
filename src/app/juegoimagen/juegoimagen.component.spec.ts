import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegoimagenComponent } from './juegoimagen.component';

describe('JuegoimagenComponent', () => {
  let component: JuegoimagenComponent;
  let fixture: ComponentFixture<JuegoimagenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JuegoimagenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JuegoimagenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
