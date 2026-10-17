import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { App } from './app';

describe('App', () => {
  let fixture: ComponentFixture<App>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [App], providers: [provideRouter([])] }).compileComponents();
    fixture = TestBed.createComponent(App);
    fixture.detectChanges();
  });

  it('debería crear el componente raíz', () => expect(fixture.componentInstance).toBeTruthy());
  it('debería contener el router outlet', () => expect(fixture.debugElement.query(By.css('router-outlet'))).toBeTruthy());
});
