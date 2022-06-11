import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppRepositoryComponent } from './app-repository.component';

describe('AppRepositoryComponent', () => {
  let component: AppRepositoryComponent;
  let fixture: ComponentFixture<AppRepositoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppRepositoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppRepositoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
