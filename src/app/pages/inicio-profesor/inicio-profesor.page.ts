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
  NombreUsuario: string | null = null;

  constructor(private route: ActivatedRoute, private Router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.NombreUsuario = params['NombreUsuario'];
      const mensajeBienvenida = document.getElementById('MensajeBienvenida');
      if (this.NombreUsuario && mensajeBienvenida) {
        mensajeBienvenida.innerText = `Bienvenido a la aplicación profesor ${this.NombreUsuario}`;
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
    this.NombreUsuario = null;
    this.Router.navigate(['/login']);
  }
}
