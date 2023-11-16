import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import {Chart, ChartConfiguration, ChartItem, registerables} from 'chart.js';
import { CupomService } from '../../services/cupom.service';

@Component({
  selector: 'app-cupons',
  templateUrl: './cupons.component.html',
  styleUrls: ['./cupons.component.css'],
})
export class CuponsComponent implements OnInit {
  
  cupons: any[] = [];
  tipos: string[] = ['Todos', 'Geral', 'Único'];
  filtroTipo: string = 'Todos';
  
  @ViewChild('closebutton') closebutton: any;

  novoCupom: any = {
    codigo: '',
    desconto: '',
    tipo: 'Geral',
    pedidoMinimo: '',
    dataLimite: null,
  };

  constructor(
    private cupomService: CupomService
  ){}

  ngOnInit(): void {
    this.atualizarLista();
    this.createChart();
    this.gerarCodigoAleatorio();
  }

  mascaraMoeda(event: any){
    const onlyDigits = event.target.value.replace(/\D/g,"")
    .replace(/(\d)(\d{8})$/,"$1.$2")
    .replace(/(\d)(\d{5})$/,"$1.$2")
    .replace(/(\d)(\d{2})$/,"$1,$2")
    this.novoCupom[event.target.id] = onlyDigits
  }

  
  maskCurrency(valor: any){
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor)
  }

  atualizarLista() {
    if (this.filtroTipo === 'Todos') {
      this.cupomService.getCupons().subscribe((data) => {
        this.cupons = this.ordenarPorDataLimite(data);
      });
    } else {
      this.cupomService.getCuponsByTipo(this.filtroTipo).subscribe((data) => {
        this.cupons = this.ordenarPorDataLimite(data);
      });
    }
  }

  ordenarPorDataLimite(cupons: any[]): any[] {
    return cupons.sort((a, b) => new Date(a.dataLimite).getTime() - new Date(b.dataLimite).getTime());
  }

  gerarCodigoAleatorio() {
    const codigoAleatorio = Math.random().toString(36).substring(2, 8).toUpperCase();
    this.novoCupom.codigo = codigoAleatorio;    
  }

  selecionarTipo(tipo: string) {
    this.filtroTipo = tipo;
    this.atualizarLista();
  }

  isActive(tipo: string): boolean {
    return this.filtroTipo === tipo;
  }

  adicionarCupom() {
    this.novoCupom.desconto = this.converterParaNumero(this.novoCupom.desconto);
    this.novoCupom.pedidoMinimo = this.converterParaNumero(this.novoCupom.pedidoMinimo);

    this.cupomService.adicionarCupom(this.novoCupom).subscribe(() => {
      this.closebutton?.nativeElement.click();
      this.novoCupom.desconto = ' ';
      this.novoCupom.pedidoMinimo = ' ';
      this.novoCupom.dataLimite = ' ';
      this.gerarCodigoAleatorio();
      this.atualizarLista();
    });
  }

  private converterParaNumero(valor: string): number {
    let v = valor.replace(/^R\$|\./g, '').replace(',', '.');
    return parseFloat(parseFloat(v).toFixed(2));
  }
  
  createChart(): void {
    Chart.register(...registerables);

    const data = {
      labels: ['Uso geral','Uso único'],
      datasets: [{
        label: '',
        data: [10, 5],
        backgroundColor: [
          '#FE4902',
          '#FE9167',
        ],
        hoverOffset: 2
      }]
    };

    const options = {
      scales: {
        y: {
          beginAtZero: true,
          display: false
        }
      }
    }

    const config: ChartConfiguration = {
      type: 'doughnut',
      data: data,
      options: options
    }

    const chartItem: ChartItem = document.getElementById('uso-chart') as ChartItem
    new Chart(chartItem, config)
  }

  handleDeleteCopom(id: number): void {
    Swal.fire({
      title: 'Tem certeza?',
      text: "Deseja deletar o cupom selecionado?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#FE4902',
      cancelButtonColor: '#606060',
      confirmButtonText: 'Sim, deletar',
      cancelButtonText: 'Cancelar',
    }).then(async(result) => {
      if (result.isConfirmed) {

        this.cupomService.excluirCupom(id).subscribe(() => {
          this.atualizarLista();
          Swal.fire({
            text: "Cupom deletado com sucesso!",
            icon: 'success',
            confirmButtonColor: '#FE4902',
          })
        });

      }
    })
  }

}
