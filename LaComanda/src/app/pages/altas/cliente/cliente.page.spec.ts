import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClientePage } from './cliente.page';

describe('ClientePage', () => {
  let component: ClientePage;
  let fixture: ComponentFixture<ClientePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ClientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
