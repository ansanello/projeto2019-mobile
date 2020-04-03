import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Cliente {
  id?: string;
  nome: string;
  email: string;
  telefone: string;
}

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private clientesCollection: AngularFirestoreCollection<Cliente>;
 
  private clientes: Observable<Cliente[]>;

  constructor(db: AngularFirestore) { 
    this.clientesCollection = db.collection<Cliente>('clientes');
 
    this.clientes = this.clientesCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getClientes() {
    return this.clientes;
  }
 
  getCliente(id) {
    return this.clientesCollection.doc<Cliente>(id).valueChanges();
  }
 
  updateCliente(todo: Cliente, id: string) {
    return this.clientesCollection.doc(id).update(todo);
  }
 
  addCliente(todo: Cliente) {
    return this.clientesCollection.add(todo);
  }
 
  removeCliente(id) {
    return this.clientesCollection.doc(id).delete();
  }
}
