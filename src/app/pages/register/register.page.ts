import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import {NavController} from '@ionic/angular'


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {

registerForm: FormGroup;
constructor(public navCtrl: NavController, private authService: AuthService, private formBuilder: FormBuilder) { }

ngOnInit() {
  //Password must have on lower case, 1 uppercase and one number
  //
  this.registerForm = this.formBuilder.group({
    fullName: ['', {updateOn: 'change', validators:[Validators.required,Validators.max(50)]} ],
    email: ['', {updateOn: 'change', validators: [Validators.required, Validators.pattern('[a-zA-Z0-9]*(.[A-Za-z0-9]*)*@[a-z]+(.[a-z]*)*.[a-z]{3}')]}],
    username: ['', {updateOn: 'change', validators: [Validators.required,Validators.maxLength(15)]}],
    password: ['',{updateOn: 'change', validators:[Validators.minLength(5), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
                                                    Validators.required]}],
    confirmPassword: ['', Validators.required]},
    { validators: this.checkIfMatchingPasswords('password', 'confirmPassword')});
}


checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
  return (group: FormGroup) => {
    let passwordInput = group.controls[passwordKey],
        passwordConfirmationInput = group.controls[passwordConfirmationKey];
    if (passwordInput.value !== passwordConfirmationInput.value) {
      return passwordConfirmationInput.setErrors({notEquivalent: true})
    }
    else {
        return passwordConfirmationInput.setErrors(null);
    }
  }
}


onSubmit() {
  this.authService.register(this.registerForm.value).subscribe(res => {
    // Call Login to automatically login the new user
    this.authService.login(this.registerForm.value).subscribe();
  });
}


}
