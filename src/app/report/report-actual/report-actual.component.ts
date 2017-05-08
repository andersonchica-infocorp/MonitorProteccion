import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report-actual',
  templateUrl: './report-actual.component.html',
  styleUrls: ['./report-actual.component.scss']
})
export class ReportActualComponent implements OnInit {

  // Pie
  public pieChartLabels: string[] = ['Error', 'Satisfactorio'];
  public pieChartData: number[] = [300, 500];
  public pieChartType: string = 'pie';
  public lineChartColors: Array<any> = [{ backgroundColor: ["#E94E4E", "#5ADCEB"] }];

  constructor() {

  }

  ngOnInit() {
  }
}
