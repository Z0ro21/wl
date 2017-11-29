import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  usuario = {
    nombre:  "",
    url: ""
  };
  constructor(private afAuth: AngularFireAuth, private router:Router) {
    this.afAuth.authState.subscribe(user => {
      if(user){
        this.usuario.nombre = user.displayName
        this.usuario.url = user.photoURL
      }else{
        this.router.navigate(['/']);
      }
    })
  }

  ngOnInit() {
  }
  
  logout() {
    this.afAuth.auth.signOut();
  }

}
