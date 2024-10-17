import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { IonContent, ModalController, Platform } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { BarcodeScanner, BarcodeFormat } from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-inicio-alumno',
  templateUrl: './inicio-alumno.page.html',
  styleUrls: ['./inicio-alumno.page.scss'],
})
export class InicioAlumnoPage implements OnInit {
  @ViewChild('content', { static: false }) content!: IonContent;
  NombreUsuario: string | null = null;
  scanResult: string = '';
  isScanning: boolean = false;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private alertController: AlertController,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.NombreUsuario = params['NombreUsuario'];
      const mensajeBienvenida = document.getElementById('MensajeBienvenida');
      if (this.NombreUsuario && mensajeBienvenida) {
        mensajeBienvenida.innerText = `Bienvenido a la aplicación alumno ${this.NombreUsuario}`;
      }
    });
  }

  ionViewDidEnter() {
    this.content.scrollToTop(300);
  }

  cerrarSesion() {
    this.NombreUsuario = null;
    this.router.navigate(['/login']);
  }

  async startScan() {
    document.body.classList.add('barcode-scanner-active');

    try {
      const listener = await BarcodeScanner.addListener(
        'barcodeScanned',
        async (result: any) => {
          console.log('QR Code Scanned:', result);
          if (result && result.content) {
            this.scanResult = result.content;
            const ElementoResultado = document.getElementById('resultadoQr');
            if (ElementoResultado) {
              ElementoResultado.innerText = this.scanResult;
            }
            await listener.remove();
          }
        }
      );

      // Inicia el escaneo
      await BarcodeScanner.startScan();
    } catch (error) {
      console.error('Error starting scan:', error);
    }
  }

  async stopScan() {
    document.body.classList.remove('barcode-scanner-active');
    await BarcodeScanner.removeAllListeners();
    await BarcodeScanner.stopScan();
    this.scanResult = '';
  }

  async checkPermissions() {
    const status = await BarcodeScanner.checkPermissions();  // Función correcta
    if (status.camera === 'granted') {  // Verificar si el permiso de la cámara está otorgado
      return true;
    } else if (status.camera === 'denied') {  // Verificar si el permiso fue denegado
      const alert = await this.alertController.create({
        header: 'No tienes permisos',
        message: 'Por favor habilita los permisos para la cámara en tus configuraciones.',
        buttons: [
          {
            text: 'No',
            role: 'cancel',
          },
          {
            text: 'Abrir configuraciones',
            handler: () => {
              BarcodeScanner.openSettings();  // Función correcta
            },
          },
        ],
      });
      await alert.present();
      return false;
    } else {
      // Si el estado del permiso es 'prompt', mostrar el prompt de permisos
      const promptAlert = await this.alertController.create({
        header: 'Permiso de cámara',
        message: 'La aplicación necesita acceso a la cámara para escanear códigos.',
        buttons: [
          {
            text: 'Aceptar',
            handler: async () => {
              const newStatus = await BarcodeScanner.requestPermissions();  // Solicitar permisos
              if (newStatus.camera === 'granted') {
                return true;
              }else {
                return false;
              }
            },
          },
        ],
      });
      await promptAlert.present();
      return false;
    }
  }
  

  async askUser() {
    const confirmed = confirm('¿Quieres escanear un código de barras?');
    if (confirmed) {
      const permissionGranted = await this.checkPermissions();
      if (permissionGranted) {
        await this.startScan();
      }
    }
  }


  async setZoomRatio(zoom: number) {
    await BarcodeScanner.setZoomRatio({ zoomRatio: zoom });
  }

  async openSettings() {
    await BarcodeScanner.openSettings();  // Función correcta
  }
}
