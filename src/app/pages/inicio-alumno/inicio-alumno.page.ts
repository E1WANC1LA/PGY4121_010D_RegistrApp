import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, ModalController, Platform } from '@ionic/angular';
import { Filesystem,Directory } from '@capacitor/filesystem';
import { ActivatedRoute, Router } from '@angular/router';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';
import { BarcodeScanner, LensFacing } from '@capacitor-mlkit/barcode-scanning';
@Component({
  selector: 'app-inicio-alumno',
  templateUrl: './inicio-alumno.page.html',
  styleUrls: ['./inicio-alumno.page.scss'],
})
export class InicioAlumnoPage implements OnInit {
  @ViewChild('content', { static: false }) content!: IonContent;
  nombreUsuario: string | null = null;
  resultadoEscaneado = '';
  constructor(
    private route: ActivatedRoute, 
    private Router: Router,
    private modalController : ModalController,
    private platform: Platform
  ) { }


  async startScan() {
    const modal = await this.modalController.create({
      component: BarcodeScanningModalComponent,
      cssClass: 'barcode-scanning-modal',
      showBackdrop: false,
      componentProps: {
        formats: [], // Aquí puedes agregar los formatos que desees escanear
        lensFacing: LensFacing.Back, // Usa la cámara trasera por defecto
      }
    });
  
    await modal.present();
  
    // Aquí escuchamos el resultado del modal
    const { data } = await modal.onDidDismiss();
  
    if (data && data.barcode) {
      // Si hay un código escaneado, lo asignamos a la variable resultadoEscaneado
      this.resultadoEscaneado = data.barcode.displayValue || '';
      console.log('Resultado escaneado:', this.resultadoEscaneado);
    }
  
    // Asegúrate de detener el escaneo después de que el modal se cierre
    await BarcodeScanner.stopScan();
  }
  
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.nombreUsuario = params['NombreUsuario'];
      const mensajeBienvenida = document.getElementById('MensajeBienvenida');
      if (this.nombreUsuario && mensajeBienvenida) {
        mensajeBienvenida.innerText = `Bienvenido a la aplicación alumno ${this.nombreUsuario}`;
      }
    });
  
    if (this.platform.is('capacitor')) {
      BarcodeScanner.isSupported().then();
      BarcodeScanner.checkPermissions().then();
      BarcodeScanner.removeAllListeners().then();
    }
  }
  
  async closeModal(barcode: string) {
    document.querySelector('body')?.classList.remove('barcode-scanning-active');
    // Dismiss del modal y envío del código escaneado
    await this.modalController.dismiss({
      barcode: {
        displayValue: barcode
      }
    });
    // Asegúrate de detener el escaneo después de cerrar el modal
    await BarcodeScanner.stopScan();
  }


  ionViewDidEnter() {
    this.content.scrollToTop(300);
  }

  cerrarSesion() {
    this.nombreUsuario = null;
    this.Router.navigate(['/login']);
  }

  


}
