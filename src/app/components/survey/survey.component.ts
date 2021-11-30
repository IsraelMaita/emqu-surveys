import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { SurveysService } from './../../services/surveys/surveys.service'

//Interfaces
interface Selector {
  key: string;
  value: string;
};

interface Survey {
  name: string;
  email: string;
  gender: string;
  ageRange: number;
  favoriteNetwork: string;
  favoriteTime: string;
  averageTime: {
    facebook: number;
    whatsapp: number;
    twitter: number;
    instagram: number;
    tiktok: number;
  }
};

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {

  surveyProcess: Boolean = false;
  newSurvey: Boolean = true;
  surveys : Survey[] | any;

  //Survey Selector Options
  genders: Selector[] = [
    {key: 'MALE', value: 'MALE'},
    {key: 'FEMALE', value: 'FEMALE'},
    {key: 'OTHER', value: 'OTHER'}
  ];

  ageRanges: Selector[] = [
    {key: 'AGE_RANGE_1', value: 'AGE_RANGE_1'},
    {key: 'AGE_RANGE_2', value: 'AGE_RANGE_2'},
    {key: 'AGE_RANGE_3', value: 'AGE_RANGE_3'},
    {key: 'AGE_RANGE_4', value: 'AGE_RANGE_4'}
  ];

  socialNetworks: Selector[] = [
    {key: 'FACEBOOK', value: 'FACEBOOK'},
    {key: 'WHATSAPP', value: 'WHATSAPP'},
    {key: 'TWITTER', value: 'TWITTER'},
    {key: 'INSTAGRAM', value: 'INSTAGRAM'},
    {key: 'TIKTOK', value: 'TIKTOK'}
  ];

  usageTimes: Selector[] = [
    {key: 'DAYTIME_1', value: 'DAYTIME_1'},
    {key: 'DAYTIME_2', value: 'DAYTIME_2'},
    {key: 'DAYTIME_3', value: 'DAYTIME_3'},
    {key: 'DAYTIME_4', value: 'DAYTIME_4'}
  ];


  //Form Validators
  aboutYouFormGroup: FormGroup | any;
  favoriteNetworkFormGroup: FormGroup | any;
  averageTimesFormGroup: FormGroup | any;

  constructor(private _formBuilder: FormBuilder, private _snackBar: MatSnackBar, private translateService: TranslateService, private surveysService: SurveysService) { }

  ngOnInit(): void {
    this.aboutYouFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      ageRange: ['', Validators.required]
    });
    this.favoriteNetworkFormGroup = this._formBuilder.group({
      favoriteNetwork: ['', Validators.required],
      favoriteTime: ['', Validators.required]
    });
    this.averageTimesFormGroup = this._formBuilder.group({
      facebook: ['', [Validators.required, Validators.min(0), Validators.max(1440)]],
      whatsapp: ['', [Validators.required, Validators.min(0), Validators.max(1440)]],
      twitter: ['', [Validators.required, Validators.min(0), Validators.max(1440)]],
      instagram: ['', [Validators.required, Validators.min(0), Validators.max(1440)]],
      tiktok: ['', [Validators.required, Validators.min(0), Validators.max(1440)]]
    });
  }

  onSendSurvey = () => {

    if (this.averageTimesFormGroup.status === 'INVALID') {
      this.openSnackBar(this.translateService.instant('MUST_FILL_ALL_FIELDS'), 'warning-snackbar');
    }
    else {
      this.newSurvey = false;
      this.surveyProcess = true;
      let survey = {
        name: this.aboutYouFormGroup.get('name').value,
        email: this.aboutYouFormGroup.get('email').value,
        gender: this.aboutYouFormGroup.get('gender').value,
        ageRange: this.aboutYouFormGroup.get('ageRange').value,
        favoriteNetwork: this.favoriteNetworkFormGroup.get('favoriteNetwork').value,
        favoriteTime: this.favoriteNetworkFormGroup.get('favoriteTime').value,
        facebook: this.averageTimesFormGroup.get('facebook').value,
        whatsapp: this.averageTimesFormGroup.get('whatsapp').value,
        twitter: this.averageTimesFormGroup.get('twitter').value,
        instagram: this.averageTimesFormGroup.get('instagram').value,
        tiktok: this.averageTimesFormGroup.get('tiktok').value
      }

      this.surveysService.addSurvey(survey)
      .subscribe({
        next: (data) => {
          this.surveyProcess = false;
          this.openSnackBar(this.translateService.instant('SURVEY_SUCCESSFULLY_SENT'), 'success-snackbar');
        },
        error: (err) => {
          this.surveyProcess = false;
          this.openSnackBar(this.translateService.instant('SURVEY_CANNOT_BE_CREATED'), 'error-snackbar');
        }
      });
    }
  };

  onResetSurvey = () => {
    this.newSurvey = true;
  };

  //Snackbar Messages Handler
  openSnackBar = (message: string, type: string) => {
    this._snackBar.open(message, void 0, { duration: 3000, panelClass: [type] });
  };

}
