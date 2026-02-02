import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

export interface NavItem {
  label: string;
  path: string;
  iconUrl: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  @Input() collapsed = false;
  @Input() mobileOpen = false;
  @Output() toggle = new EventEmitter<void>();

  navItems: NavItem[] = [
    {
      label: 'Registered Guests',
      path: '/registered-users',
      iconUrl: 'assets/img/Crown.png',
    },
    {
      label: 'Voting Result',
      path: '/voting-result',
      iconUrl: 'assets/img/Vector.png',
    },
  ];

  constructor(public router: Router) {}

  onToggle(): void {
    this.toggle.emit();
  }

  isActive(path: string): boolean {
    return this.router.url === path || this.router.url.startsWith(path + '/');
  }
}
