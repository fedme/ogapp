import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { AppService } from '../services/common/app.service';
import { OGAppService } from '../services/ogapp/ogapp.service';
import { AppInfo } from '../app.info';

@Component({
  selector: 'app-experiment',
  templateUrl: './experiment.page.html',
  styleUrls: ['./experiment.page.scss'],
})
export class ExperimentPage implements OnInit {

  public appName: string = AppInfo.nameLabel;
  public appVersion: string = AppInfo.version;

  constructor(
    private navCtrl: NavController,
    private ogAppService: OGAppService,
    public app: AppService,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
  }


  async restartApp() {
    const alert = await this.alertCtrl.create({
      header: 'Restart app?',
      message: 'IMPORTANT: data will only be saved if you reached the last page of the experiment.',
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
