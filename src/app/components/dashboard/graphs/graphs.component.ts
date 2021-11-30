import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { TranslateService } from '@ngx-translate/core';
import { SurveysService } from './../../../services/surveys/surveys.service'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.scss']
})
export class GraphsComponent implements OnInit {

  loadingDemographic: Boolean = true;

  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{}] },
  };
  
  barChartLabels: Label[] = [
    '18-25',
    '26-33',
    '34-40',
    '41-+'
  ];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [
    { data: [0, 0, 0, 0], label: 'Facebook' },
    { data: [0, 0, 0, 0], label: 'WhatsApp' },
    { data: [0, 0, 0, 0], label: 'Twitter' },
    { data: [0, 0, 0, 0], label: 'Instagram' },
    { data: [0, 0, 0, 0], label: 'TikTok' },
  ];

  constructor(private surveysService: SurveysService, private translateService: TranslateService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.surveysService.getDemographicDistribution()
    .subscribe({
      next: (data) => {

        this.barChartData = [
          { data: [data.AGE_RANGE_1.FACEBOOK, data.AGE_RANGE_2.FACEBOOK, data.AGE_RANGE_3.FACEBOOK, data.AGE_RANGE_4.FACEBOOK], label: 'Facebook' },
          { data: [data.AGE_RANGE_1.WHATSAPP, data.AGE_RANGE_2.WHATSAPP, data.AGE_RANGE_3.WHATSAPP, data.AGE_RANGE_4.WHATSAPP], label: 'WhatsApp' },
          { data: [data.AGE_RANGE_1.TWITTER, data.AGE_RANGE_2.TWITTER, data.AGE_RANGE_3.TWITTER, data.AGE_RANGE_4.TWITTER], label: 'Twitter' },
          { data: [data.AGE_RANGE_1.INSTAGRAM, data.AGE_RANGE_2.INSTAGRAM, data.AGE_RANGE_3.INSTAGRAM, data.AGE_RANGE_4.INSTAGRAM], label: 'Instagram' },
          { data: [data.AGE_RANGE_1.TIKTOK, data.AGE_RANGE_2.TIKTOK, data.AGE_RANGE_3.TIKTOK, data.AGE_RANGE_4.TIKTOK], label: 'TikTok' },
        ];

        this.loadingDemographic = false;
      },
      error: (err) => {
        this.openSnackBar(this.translateService.instant('DATA_LOADING_ERROR'), 'error-snackbar');
      }
    });

  };

  //Snackbar Messages Handler
  openSnackBar = (message: string, type: string) => {
    this._snackBar.open(message, void 0, { duration: 3000, panelClass: [type] });
  };

}
