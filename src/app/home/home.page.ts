import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonicModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage implements OnInit{
  colorClaro = 'var(--Tema-claro-fondo)';
  colorOscuro = 'var(--Tema-oscuro-fondo)';
  colorTextoClaro = 'var(--Tema-claro-texto)';
  colorTextoOscuro = 'var(--Tema-oscuro-texto)';
  colorTextoActual = this.colorTextoClaro;
  colorActual = this.colorClaro;
  genres = [
    {
      title: "Musica Clasica",
      image:"https://musicaclasica.com.ar/wp-content/uploads/92213804_212123373455654_8855503586826649600_n.jpg",
      description:"Lorem ipsum dolor sit amet consectetur adipiscing elit, luctus quam cursus cubilia porta nostra fusce, quis non hac nibh vitae semper. Nulla nunc euismod dapibus litora ac tortor turpis leo, at sed per vestibulum purus luctus porttitor sagittis, porta commodo mauris penatibus mus felis condimentum. Tristique fusce non morbi scelerisque ornare semper viverra velit, platea tempor taciti ante elementum hendrerit molestie, purus luctus et cras eget habitant orci."
    },
    {
      title: "Musica Electronica",
      image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5wk5GwTvk040hJZTC2MTkuhJAi4eQvAfe6Q&s",
      description:"Lorem ipsum dolor sit amet consectetur adipiscing elit, luctus quam cursus cubilia porta nostra fusce, quis non hac nibh vitae semper. Nulla nunc euismod dapibus litora ac tortor turpis leo, at sed per vestibulum purus luctus porttitor sagittis, porta commodo mauris penatibus mus felis condimentum. Tristique fusce non morbi scelerisque ornare semper viverra velit, platea tempor taciti ante elementum hendrerit molestie, purus luctus et cras eget habitant orci."
    },
    {
      title: "Musica jazz",
      image:"https://media.diariolasamericas.com/p/f6c2ef609c6b21f3c0ea95334c8f7572/adjuntos/216/imagenes/100/129/0100129360/855x0/smart/dia-internacional-del-jazzjpg.jpg",
      description:"Lorem ipsum dolor sit amet consectetur adipiscing elit, luctus quam cursus cubilia porta nostra fusce, quis non hac nibh vitae semper. Nulla nunc euismod dapibus litora ac tortor turpis leo, at sed per vestibulum purus luctus porttitor sagittis, porta commodo mauris penatibus mus felis condimentum. Tristique fusce non morbi scelerisque ornare semper viverra velit, platea tempor taciti ante elementum hendrerit molestie, purus luctus et cras eget habitant orci."
    },
    {
      title: "Musica pop",
      image:"https://los40.com/resizer/4J4F58FtRSyMzKqUTubgATFVnEw=/arc-photo-prisaradiolos40/eu-central-1-prod/public/4XSAQPS5P5AGPIR7Q43KXZZTUA.jpg",
      description:"Lorem ipsum dolor sit amet consectetur adipiscing elit, luctus quam cursus cubilia porta nostra fusce, quis non hac nibh vitae semper. Nulla nunc euismod dapibus litora ac tortor turpis leo, at sed per vestibulum purus luctus porttitor sagittis, porta commodo mauris penatibus mus felis condimentum. Tristique fusce non morbi scelerisque ornare semper viverra velit, platea tempor taciti ante elementum hendrerit molestie, purus luctus et cras eget habitant orci."
    }
  ]
  constructor(private router: Router, private storageService: StorageService) {}

  async ngOnInit() {
    await this.loadStorageData();
    this.simularCargaDatos();
  }

  async cambiarColor(){
    if (this.colorActual === this.colorClaro) {
      this.colorActual = this.colorOscuro;
      this.colorTextoActual = this.colorTextoOscuro;
    } else {
      this.colorActual = this.colorClaro;
      this.colorTextoActual = this.colorTextoClaro;
    }   
    
    await this.storageService.set('theme', this.colorActual);
    console.log('Tema guardado:', this.colorActual);

    await this.storageService.set('themetext', this.colorTextoActual);
    console.log('Texto guardado:', this.colorTextoActual);
  }

  async loadStorageData() {
    const savedTheme = await this.storageService.get('theme');
    const savedText = await this.storageService.get('themetext');
    if (savedTheme) {
      this.colorActual = savedTheme;
      this.colorTextoActual = savedText
    }
  }

  async goIntro() {
    await this.storageService.set('Visto', false);
    this.router.navigateByUrl('/intro');
  }

  async simularCargaDatos() {
    const data = await this.obtenerDatosSimulados();
    console.log('Datos simulados: ', data);
  }

  obtenerDatosSimulados() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(['Electronica', 'Pop', 'Jazz', 'Clasica']);
    }, 1500);
  })
  }
}
