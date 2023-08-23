import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CollegamentiComponent } from './pages/collegamenti/collegamenti.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ModifyComponent } from './pages/modify/modify.component';

const routes: Routes = [

  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'collegamenti',
    component: CollegamentiComponent
  },
  {
    path: 'modify',
    component: ModifyComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
