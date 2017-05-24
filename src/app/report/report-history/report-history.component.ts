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

  @Input() history: History;

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  constructor(private router: Router) { }

  ngOnInit() {
    if (this.history != null) {
      let count = 0;
      
        this.barChartLabels[count] = this.history.category;
        this.barChartData[0].data[count] = this.history.nok;
        this.barChartData[1].data[count] = this.history.ok;
      ;
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
