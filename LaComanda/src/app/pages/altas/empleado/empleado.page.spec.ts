import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EmpleadoPage } from './empleado.page';

describe('EmpleadoPage', () => {
  let component: EmpleadoPage;
  let fixture: ComponentFixture<EmpleadoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpleadoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EmpleadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
