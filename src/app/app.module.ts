import { NavbarComponent } from './navbar/navbar.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbCarouselModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ConsigliatoperteComponent } from './components/consigliatoperte/consigliatoperte.component';

import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './components/footer/footer.component';
import { MainProfileComponent } from './components/main-profile/main-profile.component';
import { AsideComponent } from './aside/aside.component';
import { ExperiencesComponent } from './components/experiences/experiences.component';
import { CollegamentiComponent } from './pages/collegamenti/collegamenti.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    ConsigliatoperteComponent,
    FooterComponent,
    MainProfileComponent,
    AsideComponent,
    NavbarComponent,
    ExperiencesComponent,
    CollegamentiComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
