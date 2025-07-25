import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IntroPage implements OnInit {
  genres = [
    {
        title: "App de musica",
      image:"https://holatelcel.com/wp-content/uploads/2023/12/Disen%CC%83o-sin-ti%CC%81tulo-3.png",
      description:"Lorem ipsum dolor sit amet consectetur adipiscing elit, luctus quam cursus cubilia porta nostra fusce, quis non hac nibh vitae semper. Nulla nunc euismod dapibus litora ac tortor turpis leo, at sed per vestibulum purus luctus porttitor sagittis, porta commodo mauris penatibus mus felis condimentum. Tristique fusce non morbi scelerisque ornare semper viverra velit, platea tempor taciti ante elementum hendrerit molestie, purus luctus et cras eget habitant orci."
    },
    {
      title: "list de musica",
      image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_yC7UT5XdGHGvxewDGSpoXh0TRRyPzbK-ew&s",
      description:"Lorem ipsum dolor sit amet consectetur adipiscing elit, luctus quam cursus cubilia porta nostra fusce, quis non hac nibh vitae semper. Nulla nunc euismod dapibus litora ac tortor turpis leo, at sed per vestibulum purus luctus porttitor sagittis, porta commodo mauris penatibus mus felis condimentum. Tristique fusce non morbi scelerisque ornare semper viverra velit, platea tempor taciti ante elementum hendrerit molestie, purus luctus et cras eget habitant orci."
    }
  ]
  constructor(private router: Router, private storageService: StorageService) { }

  ngOnInit() {
  }

  async goBack(){
    await this.storageService.set('Visto', true);
    this.router.navigateByUrl('menu/home');
  }

}
