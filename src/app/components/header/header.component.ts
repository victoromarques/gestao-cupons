import { Component, OnInit } from '@angular/core';
import { IntroService } from '../../services/intro.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private introService: IntroService) {}

  ngOnInit(): void {
  }

  callHandleHelp(): void {
    this.introService.handleHelp();
  }
  
}
