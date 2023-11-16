import { Injectable } from '@angular/core';

declare var introJs: any

@Injectable({
  providedIn: 'root'
})
export class IntroService {

  handleHelp(): void {

    introJs().setOptions({
      showButtons: true,
      nextLabel: 'Próximo',
      prevLabel: 'Anterior',
      doneLabel: 'Finalizar',
    }).start();

  }
  
}
