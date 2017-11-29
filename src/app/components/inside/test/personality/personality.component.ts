import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-personality',
  templateUrl: './personality.component.html',
  styleUrls: ['./personality.component.css']
})
export class PersonalityComponent implements OnInit {
  rojo:boolean = true;azul:boolean = true;verde:boolean = true;amarillo:boolean = true;
  violeta:boolean = true;marron:boolean = true;gris:boolean = true;negro:boolean = true;
  colores = [];
  referencia:string = "";
  usuariosRef: AngularFireList<any>;
  itemsUsuarios: Observable<any[]>;

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth, private router:Router) {
    this.afAuth.authState.subscribe(user => {
      this.usuariosRef = db.list('/usuarios');
      this.itemsUsuarios = this.usuariosRef.snapshotChanges().map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      });
      this.itemsUsuarios.forEach(usuarios =>{
        usuarios.forEach(usuario =>{
          if(usuario.uid === user.uid){
            this.referencia = usuario.key
          }
        })
      })
    })
  }

  ngOnInit() {
  }

  guardar(){
    this.usuariosRef.update(this.referencia, {personalidad: this.colores})
    this.router.navigate(['/main']);
  }
  presiono(color:string){
    switch(color){
      case "azul":
        this.azul = false;
        break;
      case "verde":
        this.verde = false;
        break;
      case "rojo":
        this.rojo = false;
        break;
      case "amarillo":
        this.amarillo = false;
        break;
      case "violeta":
        this.violeta = false;
        break;
      case "marron":
        this.marron = false;
        break;
      case "gris":
        this.gris = false;
        break;
      case "negro":
        this.negro = false;
        break;
    }
    this.colores.push(color);
  }

  reiniciar(){
    this.colores = []
    this.amarillo = true;this.azul = true;this.gris = true;this.marron = true;
    this.negro = true;this.rojo = true;this.verde = true;this.violeta = true;
  }
}
