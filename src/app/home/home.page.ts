import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
import { MusicService } from '../services/music.service';
import { SongsModalPage } from '../songs-modal/songs-modal.page';
import { AuthService } from '../services/auth.service';

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
  song: any = {
    name: '',
    preview_url: '',
    playing: false
  };
  currentSong: any;
  newTime: any;
  iconoFavorito: boolean = false;
  constructor(private authService: AuthService, private modalCtrl: ModalController, private router: Router, private storageService: StorageService, private musicService: MusicService) {}

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
    })

  }

  async toggleFavorito(id: any) {
    if (await this.authService.valfavoritos(id)) {
      console.log("esto es id: ", id)
      this.authService.delfavoritos(id);
      this.iconoFavorito = !this.iconoFavorito;
    }else{
      this.authService.addfavoritos(id).subscribe({
        next: res => console.log('✅ Agregado correctamente:', res),
        error: err => console.error('❌ Error al agregar:', err)
      });
      this.iconoFavorito = !this.iconoFavorito;
    }
      
  }


  loadArtists(){
    this.musicService.getArtists().then(artists => {
      this.artists = artists;
    })
  }

  loadAlbums(){
    this.musicService.getAlbums().then(albums => {
      this.albums = albums;
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

    await this.storageService.set('themetext', this.colorTextoActual);
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
  }

  obtenerDatosSimulados() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(['Electronica', 'Pop', 'Jazz', 'Clasica']);
    }, 1500);
  })
  }

  async showSongs(albumId: string) {
    const songs = await this.musicService.getSongsByAlbum(albumId);
    const modal = await this.modalCtrl.create({
      component: SongsModalPage,
      componentProps: {
        songs: songs
      }
    });
    modal.onDidDismiss().then((result) =>{
      if (result.data){
        this.song = result.data;
      }
    })
    modal.present();
  }

  async showSongsByArtists(artistId: string) {
    const songs = await this.musicService.getSongsByArtists(artistId);
    const modal = await this.modalCtrl.create({
      component: SongsModalPage,
      componentProps: {
        songs: songs
      }
    });
    modal.onDidDismiss().then((result) =>{
      if (result.data){
        this.song = result.data;
      }
    })
    modal.present();
  }

  play(){
    this.currentSong = new Audio(this.song.preview_url);
    this.currentSong.play();
    this.currentSong.addEventListener("timeupdate", ()=>{
      this.newTime = this.currentSong.currentTime / this.currentSong.duration;
    })
    this.song.playing = true;
  }

  pause(){
    this.currentSong.pause();
    this.song.playing = false;
  }

  formatTime(seconds: number) {
    if (!seconds || isNaN(seconds)) return "0:00";
    const minutes = Math.floor(seconds/60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  getRemainingTime(){
    if (!this.currentSong?.duration || !this.currentSong?.currentTime){
      return 0;
    }
    return this.currentSong.duration - this.currentSong.currentTime;
  }

}
