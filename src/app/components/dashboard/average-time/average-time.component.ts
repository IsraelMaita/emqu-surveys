import { Component, OnInit } from '@angular/core';
import { SingleDataSet, Label } from 'ng2-charts';
import { ChartType } from 'chart.js';
import { SurveysService } from './../../../services/surveys/surveys.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-average-time',
  templateUrl: './average-time.component.html',
  styleUrls: ['./average-time.component.scss']
})
export class AverageTimeComponent implements OnInit {

  loadingAverage: Boolean = true;

  public polarAreaChartLabels: Label[] = ['Facebook', 'Whatsapp', 'Twitter', 'Instagram', 'TikTok'];
  public polarAreaChartData: SingleDataSet = [0, 0, 0, 0, 0];
  public polarAreaLegend = true;

  public polarAreaChartType: ChartType = 'polarArea';

  constructor(private surveysService: SurveysService, private _snackBar: MatSnackBar, private translateService: TranslateService) { }

  ngOnInit(): void {
    this.surveysService.getAverageTimes()
    .subscribe({
      next: (data) => {
        this.loadingAverage = false;
        this.polarAreaChartData = [
          data.FACEBOOK.toFixed(2),
          data.WHATSAPP.toFixed(2),
          data.TWITTER.toFixed(2),
          data.INSTAGRAM.toFixed(2),
          data.TIKTOK.toFixed(2)
        ];
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
