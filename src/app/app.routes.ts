import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { BlogComponent } from './components/blog/blog.component';
import { ServicesComponent } from './components/services/services.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { CareersComponent } from './components/careers/careers.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, data: { breadcrumb: 'Home' } },
    { path: 'about', component: AboutComponent, data: { breadcrumb: 'About' } },
    { path: 'contacts', component: ContactsComponent, data: { breadcrumb: 'Contact Us' } },
    { path: 'blog', component: BlogComponent, data: { breadcrumb: 'Blogs' } },
    { path: 'services', component: ServicesComponent, data: { breadcrumb: 'Services' } },
    { path: 'portfolio', component: PortfolioComponent, data: { breadcrumb: 'Portfolio' } },
    { path: 'careers', component: CareersComponent, data: { breadcrumb: 'Careers' } },
    { path: '**', redirectTo: 'home' }
];
