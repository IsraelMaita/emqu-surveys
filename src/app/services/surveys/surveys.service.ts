import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SurveysService {

  constructor(private http: HttpClient) { }

  addSurvey(survey: any): Observable<any> {

    let surveyObject = {
      name: survey.name,
      email: survey.email,
      gender: survey.gender,
      ageRange: survey.ageRange,
      favoriteNetwork: survey.favoriteNetwork,
      favoriteTime: survey.favoriteTime,
      facebook: survey.facebook,
      whatsapp: survey.whatsapp,
      twitter: survey.twitter,
      instagram: survey.instagram,
      tiktok: survey.tiktok
    };

    const headers = { 'content-type': 'application/json'};

    return this.http.post<any>('api/create-survey', null, {'headers':headers, 'params': surveyObject})
  }

  getSurveys() {
    return this.http.get<any>('api/get-all-surveys');
  };

  getSurveysTotal() {
    return this.http.get<any>('api/get-surveys-total');
  };

  getNetWorkPopularity() {
    return this.http.get<any>('api/social-network-popularity');
  };

  getAverageTimes() {
    return this.http.get<any>('api/average-time-per-social-network');
  };

  getDemographicDistribution() {
    return this.http.get<any>('api/demographic-distribution');
  };

  addRandomSurvey() {
    return this.http.post<any>('api/create-random-survey',null);
  };

  deleteAllSurveys() {
    return this.http.delete<any>('api/delete-all-surveys')
  };

}
