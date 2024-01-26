import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public credentials: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthService,
    private router : Router
  ) {
    this.credentials = fb.group({});
  }


  get email(){
    return this.credentials.get("email");
  }

  get password(){
    return this.credentials.get("password");
  }

  
  ngOnInit() {
    this.credentials = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]], 
        password: ['', [Validators.required, Validators.minLength]]
      }
    )
  }

  async register(){
    const loading = await this.loadingController.create();
    await loading.present();

    const user = await this.authService.register(this.email, this.password );
    await loading.dismiss();

    if(user){
      this.router.navigateByUrl("/home", {replaceUrl : true});
    }else{
      this.showAlert("Registro sin exito", "Intentalo de nuevo.");
    }
  }

  async login(){
    const loading = await this.loadingController.create();
    await loading.present();
    const user = await this.authService.login(this.email, this.password);
    console.log(user)
    await loading.dismiss();
    if(user){
      this.router.navigateByUrl("/home", {replaceUrl : true});
    }else{
      this.showAlert("Login sin exito", "Intentalo de nuevo.");
    }
  }

  async showAlert(header:any, message:any){
    const alert = await this.alertController.create({
      header,
      message, 
      buttons: ["OK"]
    });
    await alert.present();
  }

}
