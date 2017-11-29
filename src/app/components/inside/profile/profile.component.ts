import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  forma:FormGroup;
  referencia:string = "";
  usuario = {
    uid : "",
    nombre : "",
    sexo : "",
    fechaNac : "",
    busca : "",
    interes : "",
    fotoUrl : ""
  }
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth, private router:Router) {
    this.forma = new FormGroup({
      'uid' : new FormControl('', Validators.required),
      'nombre' : new FormControl('', [Validators.required, Validators.minLength(3)]),
      'sexo' : new FormControl('', Validators.required),
      'fechaNac' : new FormControl('', [Validators.required]),
      'busca' : new FormControl('', [Validators.required]),
      'interes' : new FormControl('', Validators.required),
      'fotoUrl' : new FormControl('', Validators.required)
    })

    this.afAuth.authState.subscribe(user => {
      this.itemsRef = db.list('/usuarios');
      this.items = this.itemsRef.snapshotChanges().map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      });
      this.items.forEach(usuarios =>{
        usuarios.forEach(usuario =>{
          if(usuario.uid === user.uid){
            this.referencia = usuario.key
            this.usuario = usuario
            this.forma.setValue({
                                  ['uid'] : this.usuario.uid,
                                  ['nombre'] : this.usuario.nombre,
                                  ['sexo'] : this.usuario.sexo,
                                  ['fechaNac'] : this.usuario.fechaNac,
                                  ['busca'] : this.usuario.busca,
                                  ['interes'] : this.usuario.interes,
                                  ['fotoUrl'] : this.usuario.fotoUrl
                                })
          }
        })
      })
      if(this.usuario.uid.length === 0){
        this.forma.setValue({
                              ['uid'] : user.uid,
                              ['nombre'] : user.displayName,
                              ['sexo'] : 'hombre',
                              ['fechaNac'] : '',
                              ['busca'] : '',
                              ['interes'] : 'hombre',
                              ['fotoUrl'] : user.photoURL
                            })
      }
    })
  }

  ngOnInit() {
  }

  guardarCambios(){
    console.log(this.forma)
    this.usuario = this.forma.value;
    if(this.referencia.length > 0){
      this.itemsRef.update(this.referencia , this.usuario)
    }else{
      this.itemsRef.push( this.usuario)
    }
    this.router.navigate(['/']);
  }
}
