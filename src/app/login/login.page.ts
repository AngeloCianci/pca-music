import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { IonicModule, NavController} from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;

  errorMessage: string = '';

  validation_message = {
    email: [
      {
        type: "required", message: "El email es requerido"
      },
      {
        type: "email", message: "El email es invalido"
      }
    ],
    password: [
      {
        type: "required", message: "La contraseña es requerida"
      },
      {
        type: "minlength", message: "La contraseña debe tener al menos 6 caracteres"
      }
    ]   
  }

  constructor(private storageService: StorageService, private formBuilder: FormBuilder, private authService: AuthService, private navCtrl: NavController) { 
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([Validators.required,Validators.email])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)]))
    });
  }

  ngOnInit() {
  }

  goRegister(){
    this.navCtrl.navigateForward('/registro');
  }

 loginUser(credentials: any) {
    console.log(credentials)
    this.authService.loginUser(credentials).then(async(res) => {
      await this.storageService.set('Login', true);
      this.errorMessage = '';
      this.navCtrl.navigateForward('/home');
    }).catch(error =>{
      this.errorMessage = error;
    })
      
  }

}
