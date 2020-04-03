import { Component } from '@angular/core';
import { Cliente, ClienteService } from '../services/cliente.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  clientes: Cliente[];

  constructor(private clienteService: ClienteService, private nav: NavController) { }
 
  ngOnInit() {
    this.clienteService.getClientes().subscribe(res => {
      this.clientes = res;
    });
  }
 
  remove(item) {
    this.clienteService.removeCliente(item.id);
    this.nav.navigateBack('home');
  }
}
