import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-inicio-profesor',
  templateUrl: './inicio-profesor.page.html',
  styleUrls: ['./inicio-profesor.page.scss'],
})
export class InicioProfesorPage implements OnInit {
  @ViewChild('content', { static: false }) content!: IonContent;
  nombreUsuario: string | null = null;

  constructor(private route: ActivatedRoute, private Router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.nombreUsuario = params['NombreUsuario'];
      const mensajeBienvenida = document.getElementById('MensajeBienvenida');
      if (this.nombreUsuario && mensajeBienvenida) {
        mensajeBienvenida.innerText = `Bienvenido a la aplicación profesor ${this.nombreUsuario}`;
      }
    });
  }

  ionViewDidEnter() {
    this.content.scrollToTop(300);
  }

  GenerarQr() {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let textoQR = '';
    const caracteresLength = caracteres.length;
    for (let i = 0; i < 10; i++) {
      textoQR += caracteres.charAt(Math.floor(Math.random() * caracteresLength));
    }
    this.Router.navigate(['/generar-qr'], { queryParams: { qr: textoQR } });
  }

  cerrarSesion() {
    this.nombreUsuario = null;
    this.Router.navigate(['/login']);
  }
}
