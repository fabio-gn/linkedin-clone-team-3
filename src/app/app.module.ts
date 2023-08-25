import { NavbarComponent } from './navbar/navbar.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ConsigliatoperteComponent } from './components/consigliatoperte/consigliatoperte.component';

import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './components/footer/footer.component';
import { MainProfileComponent } from './components/main-profile/main-profile.component';
import { AsideComponent } from './aside/aside.component';
import { CollegamentiComponent } from './pages/collegamenti/collegamenti.component';
import { EsperienzeComponent } from './components/esperienze/esperienze.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { CustomDatePipe } from './custom-date.pipe';
import { ModifyComponent } from './pages/modify/modify.component';
import { PostMidComponent } from './post-mid/post-mid.component';
import { HomeprofilecardComponent } from './components/homeprofilecard/homeprofilecard.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { FooterHomeComponent } from './components/footer-home/footer-home.component';
import { NotizieAsideComponent } from './components/notizie-aside/notizie-aside.component';

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
    CollegamentiComponent,
    EsperienzeComponent,
    CustomDatePipe,
    ModifyComponent,
    PostMidComponent,
    HomeprofilecardComponent,
    HomeprofilecardComponent,
    AddPostComponent,
    FooterHomeComponent,
    NotizieAsideComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    DatePipe,
    CustomDatePipe
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
