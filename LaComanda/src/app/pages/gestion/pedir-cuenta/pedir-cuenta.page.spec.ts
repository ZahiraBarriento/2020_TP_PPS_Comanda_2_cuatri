import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PedirCuentaPage } from './pedir-cuenta.page';

describe('PedirCuentaPage', () => {
  let component: PedirCuentaPage;
  let fixture: ComponentFixture<PedirCuentaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedirCuentaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PedirCuentaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
