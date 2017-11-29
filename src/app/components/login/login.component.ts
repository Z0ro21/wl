import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private afAuth: AngularFireAuth, private router:Router) {
    this.afAuth.authState.subscribe(user => {
      if(user){
        this.router.navigate(['/main']);
      }
    })
  }

  ngOnInit() {
  }
  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider);
  }
  logout() {
    this.afAuth.auth.signOut();
  }
}
