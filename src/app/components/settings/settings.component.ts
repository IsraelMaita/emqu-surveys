import { Component, OnInit } from '@angular/core';
import { SurveysService } from './../../services/surveys/surveys.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { ColorSchemeService } from 'src/app/services/theme/color-scheme.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  processing: Boolean = false;

  constructor(private surveysService: SurveysService, private _snackBar: MatSnackBar,
    private translateService: TranslateService, private colorSchemeService: ColorSchemeService) { }

  ngOnInit(): void {
  }

  onSelectSpanish = () => {
    this.translateService.use('es');
  };

  onSelectEnglish = () => {
    this.translateService.use('en');
  };

  onSelectDarkMode = () => {
    this.colorSchemeService._setColorScheme('dark');
    this.colorSchemeService.update('dark');
  };

  onSelectLightMode = () => {
    this.colorSchemeService._setColorScheme('light');
    this.colorSchemeService.update('light');
  };

  onCreateRandomSurvey = () => {
    this.processing = true;
    this.surveysService.addRandomSurvey()
    .subscribe({
      next: (data) => {
        this.processing = false;
        this.openSnackBar(this.translateService.instant('AUTOGENERATE_SURVEY_SUCCESS'), 'success-snackbar');
      },
      error: (err) => {
        this.processing = false;
        this.openSnackBar(this.translateService.instant('ERROR_AUTOGENERATE_SURVEY'), 'error-snackbar');
      }
    });
  };

  onDeleteAllSurveys = () => {
    this.processing = true;
    this.surveysService.deleteAllSurveys()
    .subscribe({
      next: (data) => {
        this.processing = false;
        this.openSnackBar(this.translateService.instant('DELETE_SURVEYS_SUCCESS'), 'success-snackbar');
      },
      error: (err) => {
        this.processing = false;
        this.openSnackBar(this.translateService.instant('ERROR_DELETING_SURVEYS'), 'error-snackbar');
      }
    });
  };

  //Snackbar Messages Handler
  openSnackBar = (message: string, type: string) => {
    this._snackBar.open(message, void 0, { duration: 3000, panelClass: [type] });
  };

}
