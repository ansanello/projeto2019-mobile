import { Component, OnInit } from '@angular/core';

import { Cliente, ClienteService } from './../../services/cliente.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-cliente-detalhe',
  templateUrl: './cliente-detalhe.page.html',
  styleUrls: ['./cliente-detalhe.page.scss'],
})
export class ClienteDetalhePage implements OnInit {

  cliente: Cliente = {
    nome: '',
    email: '',
    telefone: ''
  };

  clienteId = null;

  constructor(private route: ActivatedRoute, private nav: NavController, private clienteService: ClienteService, private loadingController: LoadingController) { }

  ngOnInit() {
    this.clienteId = this.route.snapshot.params['id'];
    if (this.clienteId)  {
      this.loadCliente();
    }
  }

  async loadCliente() {
    const loading = await this.loadingController.create({
      message: 'Loading Cliente..'
    });
    await loading.present();
 
    this.clienteService.getCliente(this.clienteId).subscribe(res => {
      loading.dismiss();
      this.cliente = res;
    });
  }

  async saveCliente() {
 
    const loading = await this.loadingController.create({
      message: 'Gravando Cliente..'
    });
    await loading.present();
 
    if (this.clienteId) {
      this.clienteService.updateCliente(this.cliente, this.clienteId).then(() => {
        loading.dismiss();
        this.nav.navigateBack('home');
      });
    } else {
      this.clienteService.addCliente(this.cliente).then(() => {
        loading.dismiss();
        this.nav.navigateBack('home');
      });
    }
  }

}
