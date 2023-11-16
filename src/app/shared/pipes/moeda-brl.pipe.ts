import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'moedaBRL'
})
export class MoedaBRLPipe implements PipeTransform {
  transform(value: number | string): string {
    if (typeof value === 'string') {
      value = parseFloat(value);
    }

    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  }
}