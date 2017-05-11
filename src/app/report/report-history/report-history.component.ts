import { Component, OnInit, Input } from '@angular/core';
import { History } from '../../Model/history.model';
import { BarChartData } from '../../Model/barChartData.model';

@Component({
  selector: 'app-report-history',
  templateUrl: './report-history.component.html',
  styleUrls: ['./report-history.component.scss']
})
export class ReportHistoryComponent implements OnInit {

@Input() history: History[];

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  constructor() { }

  ngOnInit() {
    if (this.history != null) {
      let count = 0;
      this.history.forEach(element => {
        this.barChartLabels[count] = element.category;
        this.barChartData[0].data[count] = element.nok;
        this.barChartData[1].data[count] = element.ok;
      });
    }
  }

  public barChartLabels: string[] = [];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;

  public barChartData: any[] = [
    { data: [], label: 'Error' },
    { data: [], label: 'Satisfactorio' }
  ];
}
