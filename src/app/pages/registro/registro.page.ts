import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  constructor(private alertController: AlertController,private router: Router) {

    localStorage.removeItem('isLoggedIn');

  }

  ngOnInit() {
  }

  async Registrarse() {
    const NombreInput = document.getElementById('nombre') as HTMLInputElement;
    const apellidoInput = document.getElementById('apellido') as HTMLInputElement;
    const NombreUsuarioInput = document.getElementById('NombreUsuario') as HTMLInputElement;
    const contrasenaInput = document.getElementById('contrasena') as HTMLInputElement;
    const confirmarContrasenaInput = document.getElementById('confirmarContrasena') as HTMLInputElement;
    const tipoUsuario = document.getElementById('tipoUsuario') as HTMLInputElement;

    const Nombre = NombreInput.value;
    const apellido = apellidoInput.value;
    const NombreUsuario = NombreUsuarioInput.value;
    const contrasena = contrasenaInput.value;
    const confirmarContrasena = confirmarContrasenaInput.value;
    const tipo = tipoUsuario.value;
    let msg = '';
    console.log(Nombre, apellido, NombreUsuario, contrasena, confirmarContrasena, tipo);

    if (tipo === undefined) {
      msg += 'Debes seleccionar un tipo de usuario\n';
    }
    if (Nombre === '') {
      msg += 'Debes ingresar un Nombre\n';
    }
    if (apellido === '') {
      msg += 'Debes ingresar un Apellido\n';
    }
    if (NombreUsuario === '') {
      msg += 'Debes ingresar un Nombre de Usuario\n';
    }
    if (contrasena === '') {
      msg += 'Debes ingresar una contraseña\n';
    }
    if (confirmarContrasena === '') {
      msg += 'Debes confirmar la contraseña\n';
    }
    if (contrasena !== confirmarContrasena) {
      msg += 'Las contraseñas no coinciden\n';
    }

    NombreInput.value = '';
    apellidoInput.value = '';
    NombreUsuarioInput.value = '';
    contrasenaInput.value = '';
    confirmarContrasenaInput.value = '';
    tipoUsuario.value = '';

    if (msg !== '') {
      let alert = await this.alertController.create({
        header: 'Error',
        message: msg,
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    let alert = await this.alertController.create({
      header: 'Registro exitoso',
      message: `Se ha registrado con exito`,
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
