import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private formulario: any;
  private listaTransacao: Array<any>;
  private status: string;
  private total = 0;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      tipo:   ['compra', Validators.required],
      nome:   [null, Validators.required],
      valor:  [null, Validators.required]
    });

    this.setLista();
  }

  private onSubmit(): void {
    if (this.formulario.valid) {
      this.listaTransacao = this.listaTransacao || [];
      this.listaTransacao.push({
        tipo: this.formulario.get('tipo').value,
        nome: this.formulario.get('nome').value,
        valor: parseFloat(this.formulario.get('valor').value)
      });

      localStorage.setItem('transacoes', JSON.stringify(this.listaTransacao));
      this.setLista();
    }
  }

  private setLista(): void {
    this.total = 0;
    this.listaTransacao = JSON.parse(localStorage.getItem('transacoes'));

    this.listaTransacao.forEach(item => {
      if (item.tipo === 'compra') {
        console.log(item.valor);
        this.total -= parseFloat(item.valor);
      } else {
        this.total += parseFloat(item.valor);
      }
    });

    if (this.total > 0) {
      this.status = '[LUCRO]';
    } else if (this.total < 0) {
      this.status = '[PREJUIZO]';
    } else {
      this.status = '';
    }
  }

}
