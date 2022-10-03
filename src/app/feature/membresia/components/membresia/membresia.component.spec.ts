import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MembresiaComponent } from './membresia.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('MembresiaComponent', () => {
  let component: MembresiaComponent;
  let fixture: ComponentFixture<MembresiaComponent>

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MembresiaComponent ],
      imports: [
        HttpClientModule,
        RouterTestingModule
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembresiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deberia crear el componente correctamente', () => {
    expect(component).toBeTruthy();
  });
})
