import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-likes',
  templateUrl: './likes.component.html',
  styleUrls: ['./likes.component.css']
})
export class LikesComponent implements OnInit {
  forma:FormGroup;
  referencia:string = "";
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  usuariosRef: AngularFireList<any>;
  itemsUsuarios: Observable<any[]>;
  preguntas = []
  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth, private router:Router) {
    this.forma = new FormGroup({})
    this.afAuth.authState.subscribe(user => {
      this.itemsRef = db.list('/preguntas/gustos');
      this.items = this.itemsRef.snapshotChanges().map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      })
      this.items.forEach(preguntas =>{
        this.preguntas = []
        preguntas.forEach(pregunta => {
          this.preguntas.push(pregunta)
          this.forma.addControl( pregunta.no , new FormControl('', Validators.required))
        })
      })

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

  insertapregunta(){
    let respuestas = this.forma.value
    this.usuariosRef.update(this.referencia, {gustos: respuestas})
    this.router.navigate(['/main/test/vision']);
  }

}
