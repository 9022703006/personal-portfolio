import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollyCanvasComponent } from './scrolly-canvas.component';

describe('ScrollyCanvasComponent', () => {
  let component: ScrollyCanvasComponent;
  let fixture: ComponentFixture<ScrollyCanvasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScrollyCanvasComponent]
    });
    fixture = TestBed.createComponent(ScrollyCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
