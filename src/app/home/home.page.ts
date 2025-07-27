import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
import { MusicService } from '../services/music.service';
import { SongsModalPage } from '../songs-modal/songs-modal.page';

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

  tracks: any;
  albums: any;
  localArtists: any;
  artists: any;
  constructor(private modalCtrl: ModalController, private router: Router, private storageService: StorageService, private musicService: MusicService) {}

  async ngOnInit() {
    await this.loadStorageData();
    this.simularCargaDatos();
    this.loadTracks();
    this.loadAlbums();
    this.loadArtists();
  }

  loadTracks(){
    this.musicService.getTracks().then(tracks => {
      this.tracks = tracks;
      console.log(this.tracks, "las canciones")
    })

  }

  loadArtists(){
    this.musicService.getArtists().then(artists => {
      this.artists = artists;
      console.log(this.artists, "los artistas")
    })
  }

  loadAlbums(){
    this.musicService.getAlbums().then(albums => {
      this.albums = albums;
      console.log(this.albums, "los albums")
    })

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

  async showSongs(albumId: string) {
    console.log("album id: ", albumId)
    const songs = await this.musicService.getSongsByAlbum(albumId);
    console.log("songs: ", songs)
    const modal = await this.modalCtrl.create({
      component: SongsModalPage,
      componentProps: {
        songs: songs
      }
    });
    modal.present();
  }

  async showSongsByArtists(artistId: string) {
    console.log("artist id: ", artistId)
    const songs = await this.musicService.getSongsByArtists(artistId);
    console.log("songs: ", songs)
    const modal = await this.modalCtrl.create({
      component: SongsModalPage,
      componentProps: {
        songs: songs
      }
    });
    modal.present();
  }

}
