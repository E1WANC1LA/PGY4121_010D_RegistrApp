import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-generar-qr',
  templateUrl: './generar-qr.page.html',
  styleUrls: ['./generar-qr.page.scss'],
})
export class GenerarQRPage implements OnInit {
  textoQR: string | null = "";
  QrTexto = "Texto QR";
  NombreUsuario: string | null = null;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.textoQR = params['qr'] || null;
      this.NombreUsuario = params['NombreUsuario'] || null
      this.QrTexto = this.textoQR || '';
    });
  }

  cerrarSesion() {
    this.NombreUsuario = null;
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
    localStorage.removeItem('correo');
    this.router.navigate(['/login']);
  }

  IrInicioProfesor() {
    this.router.navigate(['/inicio-profesor'], { queryParams: { NombreUsuario: this.NombreUsuario } });
  }

}