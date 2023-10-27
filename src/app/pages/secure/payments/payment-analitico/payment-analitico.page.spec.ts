import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PaymentAnaliticoPage } from './payment-analitico.page';

describe('PaymentAnaliticoPage', () => {
  let component: PaymentAnaliticoPage;
  let fixture: ComponentFixture<PaymentAnaliticoPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentAnaliticoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentAnaliticoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
