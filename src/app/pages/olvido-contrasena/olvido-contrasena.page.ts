import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-olvido-contrasena',
  templateUrl: './olvido-contrasena.page.html',
  styleUrls: ['./olvido-contrasena.page.scss'],
})
export class OlvidoContrasenaPage {
  constructor(private alertController: AlertController,private router: Router) {
    localStorage.removeItem('isLoggedIn');


  }

  async recuperarContrasena() {
    const nombreUsuarioInput = document.getElementById('nombreUsuario') as HTMLInputElement;
    const nombreUsuario = nombreUsuarioInput.value;

    if (nombreUsuario === '') {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Debes ingresar un nombre de usuario.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    const alert = await this.alertController.create({
      header: 'Recuperación de Contraseña',
      message: `Se ha enviado un enlace de recuperación a ${nombreUsuario}.`,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.router.navigate(['/login']);
          }
        }
      ]
    });

    await alert.present();
  }
}