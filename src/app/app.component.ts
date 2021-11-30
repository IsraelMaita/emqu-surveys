import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { ColorSchemeService } from "./services/theme/color-scheme.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'emqu-surveys';

  constructor( private colorSchemeService: ColorSchemeService, private route: Router, private translate: TranslateService ) {
    // Load Color Scheme
    this.colorSchemeService.load();
    translate.setDefaultLang('es');

    this.route.navigate(['/']);

  }

}
