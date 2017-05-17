import { Component, OnInit, Input } from '@angular/core';
import { Actual } from '../../Model/actual.model';
import { BarChartData } from '../../Model/barChartData.model';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-report-actual',
  templateUrl: './report-actual.component.html',
  styleUrls: ['./report-actual.component.scss']
})
export class ReportActualComponent implements OnInit {

  @Input() actual: Actual[];


  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLabels: string[] = [];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;

  public barChartData: BarChartData[] = [
    { data: [], label: 'Error' },
    { data: [], label: 'Satisfactorio' }
  ];
  constructor(private router: Router) { }

  ngOnInit() {
    if (this.actual != null) {
      let count = 0;
      this.actual.forEach(element => {
        this.barChartLabels[count] = element.application;
        this.barChartData[0].data[count] = element.nok;
        this.barChartData[1].data[count] = element.ok;
      });
    }
  }

  chartClicked(event) {
    if (event.active.length > 0) {
      this.router.navigate(['/retry']);
    }
  }
}
