import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(private transalate:TranslateService) { }

  ngOnInit(): void {
  }

  //-------- TRANSLATOR ---------
  
  changeLanguage(lang: string) {
    this.transalate.use(lang);
  }
  //-----------------------------

}
