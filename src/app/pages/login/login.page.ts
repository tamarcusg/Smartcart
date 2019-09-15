import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import {NavController} from '@ionic/angular'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  credentialsForm: FormGroup;

  constructor(public navCtrl: NavController, 
              private formBuilder: FormBuilder,
              private authService: AuthService) { }

  ngOnInit() {
    this.credentialsForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    this.authService.login(this.credentialsForm.value).subscribe();
  }

  register() {
    this.navCtrl.navigateRoot('/register');

    // this.authService.register(this.credentialsForm.value).subscribe(res => {
    //   // Call Login to automatically login the new user
    //   this.authService.login(this.credentialsForm.value).subscribe();
    // });
  }

}

