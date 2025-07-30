import { Component, OnInit } from '@angular/core';
import { companies } from '../../data/branding';
import { CommonModule } from '@angular/common';
import { NgbModal, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { mobileApps } from '../../data/mobileapps';
import { webApps } from '../../data/webapps';

@Component({
  selector: 'app-portfolio',
  imports: [CommonModule, NgbNavModule],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css',
})
export class PortfolioComponent implements OnInit {

  brandingsList = companies;
  mobileAppsList = mobileApps;
  webAppsList = webApps;
  groupedMobileApps: { [category: string]: any[] } = {};
  groupedWebApps: { [category: string]: any[] } = {};

  active = 'top';
  selectedBranding: any = null;
  selectedApp: any = null;

  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.groupMobileApps();
    this.groupWebApps();
  }

  openBrandingModal(content: any, branding: any) {
    this.selectedBranding = branding;
    this.modalService.open(content, { scrollable: true, size: 'xl' });
  }

  openAppModal(content: any, app: any) {
    this.selectedApp = app;
    this.modalService.open(content, { scrollable: true, size: 'xl' });
  }

  groupMobileApps() {
    const grouped = this.mobileAppsList.reduce((acc, app) => {
      const category = app.description;
      if (!acc[category]) acc[category] = [];
      acc[category].push(app);
      return acc;
    }, {} as { [category: string]: any[] });

    grouped['All'] = this.mobileAppsList;
    this.groupedMobileApps = grouped;

    this.active = 'All';
  }


  groupWebApps() {
    const grouped = this.webAppsList.reduce((acc, app) => {
      const category = app.description;
      if (!acc[category]) acc[category] = [];
      acc[category].push(app);
      return acc;
    }, {} as { [category: string]: any[] });

    grouped['All'] = this.webAppsList;
    this.groupedWebApps = grouped;

    this.active = 'All';
  }

  getMobileAppCategories(): string[] {
    const keys = Object.keys(this.groupedMobileApps);
    return ['All', ...keys.filter(k => k !== 'All')];
  }

  getWebAppCategories(): string[] {
    const keys = Object.keys(this.groupedWebApps);
    return ['All', ...keys.filter(k => k !== 'All')];
  }

  onTabChange(event: any) {
    if (event.nextId === 'ngb-nav-1') {
      this.groupMobileApps();
    } else if (event.nextId === 'ngb-nav-2') {
      this.groupWebApps();
    }
  }

  onImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = '/portfolio/mobileapps/default/default.webp';
  }

}