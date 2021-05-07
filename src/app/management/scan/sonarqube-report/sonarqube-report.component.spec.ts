import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SonarqubeReportComponent } from './sonarqube-report.component';

describe('SonarqubeReportComponent', () => {
  let component: SonarqubeReportComponent;
  let fixture: ComponentFixture<SonarqubeReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SonarqubeReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SonarqubeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
