import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DuenioPage } from './duenio.page';

describe('DuenioPage', () => {
  let component: DuenioPage;
  let fixture: ComponentFixture<DuenioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DuenioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DuenioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
