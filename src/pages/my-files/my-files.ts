import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, ToastController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { Observable } from 'rxjs/Observable';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-my-files',
  templateUrl: 'my-files.html',
})
export class MyFilesPage {

  files: Observable<any[]>;

  constructor(
    public navCtrl: NavController,
    private dataProvider: DataProvider,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private iab: InAppBrowser,
    private fileChooser: FileChooser,
    private file: File
  ) {
    this.files = this.dataProvider.getFiles();
  }

  addFile() {
    let inputAlert = this.alertCtrl.create({
      title: 'Store new Information',
      inputs: [
        {
          name: 'info',
          placeholder: 'Lorem ipsum dolor...'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Storage',
          handler: data => {
            this.uploadInformation(data.info);
          }
        }
      ]
    });
    inputAlert.present();
  }

  uploadInformation(text) {
    let upload = this.dataProvider.uploadToStorage(text);

    upload.then().then(res => {
      console.log('res: ', res);
      this.dataProvider.storeInfoToDatabase(res.metadata).then(() => {
        let toast = this.toastCtrl.create({
          message: 'New File added!',
          duration: 3000
        });
        toast.present();
      });
    });
  }

  deleteFile(file) {
    this.dataProvider.deleteFile(file).subscribe(() => {
      let toast = this.toastCtrl.create({
        message: 'File removed!',
        duration: 3000
      });
      toast.present();
    });
  }

  viewFile(url) {
    this.iab.create(url);
  }

  chooseFile() {
    this.fileChooser.open().then((uri) => {
      alert(uri);

      this.file.resolveLocalFilesystemUrl(uri).then((newUrl) => {
        alert(JSON.stringify(newUrl));

        let dirPath = newUrl.nativeURL;
        let dirPathSegments = dirPath.split('/')
        dirPathSegments.pop()
        dirPath = dirPathSegments.join('/')

        this.file.readAsArrayBuffer(dirPath, newUrl.name).then( async (buffer) => {
          await this.uploadFile(buffer, newUrl.name);
        });

      })
    })
  }

  async uploadFile(buffer, name) {
    let blob = new Blob([buffer], { type: "images/jpeg" })
    let storage = firebase.storage();

    storage.ref().put(blob).then((d) => {
      alert('Done');
    }).catch((err) => {
      alert(JSON.stringify(err));
    })
  }
}
