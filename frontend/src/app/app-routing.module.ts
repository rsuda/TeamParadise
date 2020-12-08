import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaypalComponent } from './paypal/paypal.component';
import { LoginComponent } from './login/login.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { ProfileComponent } from './profile/profile.component';
import { PostComponent } from './posts/posts.component'
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { AboutComponent } from './about/about.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'paypal', component: PaypalComponent },
  { path: 'announcements', component: PostListComponent},
  { path: 'profile', component: ProfileComponent },
  { path: 'posts', component: PostComponent },
  { path: 'create', component: PostCreateComponent},
  { path: 'about', component: AboutComponent},
  { path: 'admin', component: AdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
