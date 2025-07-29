import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { IonicModule, NavController} from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class RegistroPage implements OnInit {

  registroForm: FormGroup;

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
    ], nombre: [
      { 
        type: "required", message: "*Este campo es obligatorio" 
      },
      { 
        type: "minlength", message: "*debes usar minimo 4 carcteres" 
      },
    ],
    apellido: [
      { 
        type: "required", message: "*Este campo es obligatorio" 
      },
      { 
        type: "minlength", message: "*debes usar minimo 4 caracteres" 
      },
    ]
  }

  constructor(private storageService: StorageService, private formBuilder: FormBuilder, private authService: AuthService, private navCtrl: NavController) { 
    this.registroForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      nombre: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
      apellido: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
      confirmPassword: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)]))
    });
  }

  ngOnInit() {
  }

  gologin(){
    this.navCtrl.navigateForward('/login');
  }

  registroUser(credentials: any) {
    if (credentials.password !== credentials.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return;
    }

    this.authService.registroUser(credentials).subscribe(res => {
      this.errorMessage = '';
      console.log(res)
      this.navCtrl.navigateForward('/login');
    })
  }

}
