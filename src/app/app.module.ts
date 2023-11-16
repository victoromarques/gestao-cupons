import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CupomService } from './services/cupom.service';
import { FormsModule } from '@angular/forms';
import { MoedaBRLPipe } from './shared/pipes/moeda-brl.pipe';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { CuponsComponent } from './pages/cupons/cupons.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    MoedaBRLPipe,
    AppComponent,
    HeaderComponent,
    CuponsComponent,
    FooterComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [CupomService],
  bootstrap: [AppComponent]
})
export class AppModule { }
