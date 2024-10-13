import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  NombreUsuario: string = '';
  contrasena: string = '';
  TipoUsuarioString: string = '';

  constructor(private router: Router) { }

  iniciarSesion() {
    const NombreUsuarioInput = document.getElementById('NombreUsuario') as HTMLInputElement;
    const contrasenaInput = document.getElementById('contrasena') as HTMLInputElement;
    const tipoUsuario = document.getElementById('tipoUsuario') as HTMLInputElement;

    let NombreUsuario = NombreUsuarioInput.value;
    let contrasena = contrasenaInput.value;
    let TipoUsuarioString = tipoUsuario.value;

    console.log(NombreUsuario, contrasena);
    console.log(TipoUsuarioString);
    let msg = '';
    if (TipoUsuarioString === undefined) {
      msg += 'Debes seleccionar un tipo de usuario\n';
    }
    if (NombreUsuario === '') {
      msg += 'Debes ingresar un Nombre de Usuario\n';
    }
    if (contrasena === '') {
      msg += 'Debes ingresar una contraseña\n';
    }
    if (msg !== '') {
      alert(msg);

      return;
    }
    NombreUsuarioInput.value = '';
    contrasenaInput.value = '';
    console.log(TipoUsuarioString);
    switch (TipoUsuarioString) {
      case '1':
        this.router.navigate(['/inicio-profesor'], { queryParams: { NombreUsuario: this.NombreUsuario } });
        break;
      case '2':
        this.router.navigate(['/inicio-alumno'], { queryParams: { NombreUsuario: this.NombreUsuario } });
        break;
      default:
        alert('Tipo de usuario no válido');
        break;
    }
  }
}