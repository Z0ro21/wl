import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  usuariosRef: AngularFireList<any>;
  itemsUsuarios: Observable<any[]>;
  usuario = {
    uid: "",
    nombre: "",
    fotoUrl: "",
    gustos :[],
    personalidad:[],
    vision:[],
    interes : ""
  }
  usuarios = []
  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      this.usuariosRef = db.list('/usuarios');
      this.itemsUsuarios = this.usuariosRef.snapshotChanges().map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      });
      this.itemsUsuarios.forEach(usuarios =>{
        usuarios.forEach(usuario =>{
          if(usuario.uid === user.uid){
            this.usuario = usuario
          }
        })
      })
    })
  }

  ngOnInit() {
  }

  comparar(){
    this.filtar();
    console.log(this.usuarios.length)
    console.log(this.usuarios)
    this.usuarios.forEach(usuario =>{
      for (let i = 0; i < usuario.gustos.length; i++) {
          console.log(usuario.gustos[i] + "==="+  this.usuario.gustos[i])
          if(usuario.gustos[i] === this.usuario.gustos[i]){
            console.log(usuario.nombre+" Coinciden!")
          }
      }
    })
  }

  filtar(){
    this.usuarios = []
    let sexo:string = ""
    if(this.usuario.interes === "mujeres"){
      sexo = "mujer"
    }
    if(this.usuario.interes === "hombres"){
      sexo = "hombre"
    }
    this.itemsUsuarios.forEach(usuarios =>{
      usuarios.forEach(usuario =>{
        if(usuario.uid != this.usuario.uid){
          if(sexo.length != 0){
            if(usuario.sexo === sexo){
              this.usuarios.push(usuario)
            }
          }else{
            this.usuarios.push(usuario)
          }
        }
      })
    })
    return this.usuarios
  }

}
