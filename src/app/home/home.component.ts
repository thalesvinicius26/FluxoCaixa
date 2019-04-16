import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  formulario: any;
  listaTransacao: Array<any>;
  total: number = 0;
  status: string;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      tipo: ['compra', Validators.required],
      nome: [null, Validators.required],
      valor: [null, Validators.required]
    });

    this.setLista();
  }

  onSubmit() {
    if (this.formulario.valid) {
      this.listaTransacao = this.listaTransacao || [];
      this.listaTransacao.push({
        tipo: this.formulario.get('tipo').value,
        nome: this.formulario.get('nome').value,
        valor: parseFloat(this.formulario.get('valor').value)
      });

      this.listaTransacao.forEach(item => {
        if (item.tipo === 'compra') {
          this.total -= parseFloat(item.valor);
        } else {
          this.total += parseFloat(item.valor);
        }
      });

      localStorage.setItem('transacoes', JSON.stringify(this.listaTransacao));
      localStorage.setItem('transacoes-total', JSON.stringify(this.total));

      this.setLista();
    }
  }

  setLista() {
    this.listaTransacao = JSON.parse(localStorage.getItem('transacoes'));
    this.total = JSON.parse(localStorage.getItem('transacoes-total'));

    if (this.total > 0) {
      this.status = '[LUCRO]';
    } else if (this.total < 0) {
      this.status = '[PREJUIZO]';
    } else {
      this.status = '';
    }
  }

}
