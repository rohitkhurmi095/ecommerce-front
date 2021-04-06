import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ecommerce-front';

  constructor(private translate: TranslateService) {}

  //ADDING DEFAULT LANGUAGE FOR TRANSLATOR
  //also add set of supported language types
  ngOnInit() {
    this.translate.setDefaultLang('en');
    this.translate.addLangs(['en', 'hi']);
  }
}
