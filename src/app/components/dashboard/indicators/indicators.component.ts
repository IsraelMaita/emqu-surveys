import { Component, OnInit } from '@angular/core';
import { SurveysService } from './../../../services/surveys/surveys.service'
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-indicators',
  templateUrl: './indicators.component.html',
  styleUrls: ['./indicators.component.scss']
})
export class IndicatorsComponent implements OnInit {

  loadingTotal: Boolean = true;
  loadingPopularity: Boolean = true;
  surveysTotal: Number = 0;
  mostImage: String = '';
  lessImage: String = '';

  constructor(private surveysService: SurveysService, private _snackBar: MatSnackBar, private translateService: TranslateService) { }

  ngOnInit(): void {
    this.surveysService.getSurveysTotal()
    .subscribe({
      next: (data) => {
        this.loadingTotal = false;
        this.surveysTotal = data;
      },
      error: (err) => {
        this.openSnackBar(this.translateService.instant('DATA_LOADING_ERROR'), 'error-snackbar');
      }
    });

    this.surveysService.getNetWorkPopularity()
    .subscribe({
      next: (data) => {
        this.loadingPopularity = false;
        this.mostImage = './assets/images/'+data.MOST.toLowerCase()+'.png';
        this.lessImage = './assets/images/'+data.LESS.toLowerCase()+'.png';
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
