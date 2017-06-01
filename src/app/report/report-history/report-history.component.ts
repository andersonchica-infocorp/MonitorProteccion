import { Component, OnInit, Input } from '@angular/core';
import { History } from '../../Model/history.model';
import { BarChartData } from '../../Model/barChartData.model';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-report-history',
  templateUrl: './report-history.component.html',
  styleUrls: ['./report-history.component.scss']
})
export class ReportHistoryComponent implements OnInit {

  @Input() history: any;

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  constructor(private router: Router) { }

  ngOnInit() {

if (this.history != null) {
      let count = 0;
      this.history.categories.forEach(element => {
        this.barChartLabels[count] = element.category;
        this.barChartData[0].data[count] = element.nok;
        this.barChartData[1].data[count] = element.ok;

        count ++;
      });
    }
  }

  chartClicked(event) {
    if (event.active.length > 0) {
      this.router.navigate(['/retry/history']);
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
