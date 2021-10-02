import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AboutComponent } from "./components/about/about.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { LoginComponent } from "./components/login/login.component";
import { TeamComponent } from "./components/team/team.component";
import {AuthGuard} from './auth.guard';
import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/home/home.component";
const routes: Routes = [
  { path:'',
    component: AppComponent,
    canActivate: [AuthGuard]
  },
  { path:'home',
    component: HomeComponent,
    canActivate:[AuthGuard],
    children:[
      { path:'dashboard', component: DashboardComponent },
      { path:'about', component: AboutComponent},
      { path:'team', component: TeamComponent},
    ]
  },
  // { path:'dashboard', component: DashboardComponent },
  // { path:'about', component: AboutComponent},
  // { path:'team', component: TeamComponent},
  { path:'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
