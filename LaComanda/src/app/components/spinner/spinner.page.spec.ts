import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SpinnerPage } from './spinner.page';

describe('SpinnerPage', () => {
  let component: SpinnerPage;
  let fixture: ComponentFixture<SpinnerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpinnerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SpinnerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
