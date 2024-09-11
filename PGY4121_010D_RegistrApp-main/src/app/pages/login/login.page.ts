import { Component } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  constructor(private router: Router) {}

  iniciarSesion() {
    const NombreUsuarioInput = document.getElementById('NombreUsuario') as HTMLInputElement;
    const contrasenaInput = document.getElementById('contrasena') as HTMLInputElement;
    const tipoUsuario = document.getElementById('tipoUsuario') as HTMLInputElement;

    const NombreUsuario = NombreUsuarioInput.value;
    const contrasena = contrasenaInput.value;
    const tipo = tipoUsuario.value;

    console.log(NombreUsuario, contrasena);
    console.log(tipo);
    let msg = '';
    if (tipo === undefined) {
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
    const TipoUsuarioString = tipo.toString();
    NombreUsuarioInput.value = '';
    contrasenaInput.value = '';

    switch (TipoUsuarioString) {
      case '1':
        this.router.navigate(['/inicio-profesor'], { queryParams: { NombreUsuario } });
        break;
      case '2':
        this.router.navigate(['/inicio-alumno'], { queryParams: { NombreUsuario } });
        break;
      default:
        alert('Tipo de usuario no válido');
        break;
    }
  }
}