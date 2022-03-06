import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../app/shared/auth.service';
import { AccountService } from '../app/shared/account.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  loginForm !: FormGroup

  constructor(
    public auth: AuthService,
    public account: AccountService,
    private formBuilder: FormBuilder,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: ['']
    });
  }

  login() {
    let username = this.loginForm.value.username;
    let password = this.loginForm.value.password;
    console.log(username)
    console.log(password)

    this.auth.login(username, password)
    .subscribe(res => {
      console.log(res);
      if (res.success) {
        localStorage.setItem('currentUser', 
        JSON.stringify({token: res.data.token, name: res.data.name})
        );
        this.router.navigate(['admin']);

      }else {
        alert('Hiba! A belépés sikertelen!')
      }
    })

  }

  logout(){
    this.auth.logout();
  }

  

}