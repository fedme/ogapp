import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { AppService } from '../services/common/app.service';
import { OGAppService } from '../services/ogapp/ogapp.service';
import { AppInfo } from '../app.info';
import { DataService } from '../services/common/data.service';

@Component({
  selector: 'app-experiment',
  templateUrl: './experiment.page.html',
  styleUrls: ['./experiment.page.scss'],
})
export class ExperimentPage implements OnInit {

  public appName: string = AppInfo.nameLabel;
  public appVersion: string = AppInfo.version;
  endCheckInterval: any;

  constructor(
    private navCtrl: NavController,
    private ogAppService: OGAppService,
    public app: AppService,
    private alertCtrl: AlertController,
    private dataService: DataService
  ) { }

  ngOnInit() {
    localStorage.setItem('isrc-ogapp-ended', 'false');
    localStorage.removeItem('isrc-ogapp-data');
    this.endCheckInterval = setInterval(() => {
      this.checkEnded();
    }, 600);
  }

  checkEnded() {
    if (localStorage.getItem('isrc-ogapp-ended') == 'true') {
      localStorage.setItem('isrc-ogapp-ended', 'false');

      this.dataService.save();
      this.navCtrl.navigateRoot('/end');
    }
  }

  async restartApp() {
    const alert = await this.alertCtrl.create({
      header: 'Restart app and lose session data?',
      message: 'IMPORTANT: data from this session will be lost!',
      buttons: [
        {
          text: 'Restart',
          handler: () => {
            // TODO: save data here!!
            this.navCtrl.navigateRoot('/');
          }
        },
        {
          text: 'Stay here',
          role: 'cancel',
          handler: () => { }
        }
      ]
    });
    alert.present();
  }

}
