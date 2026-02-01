import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

export interface NavItem {
  label: string;
  path: string;
  icon: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() collapsed = false;
  @Input() mobileOpen = false;
  @Output() toggle = new EventEmitter<void>();

  navItems: NavItem[] = [
    { label: 'Voting Result', path: '/voting-result', icon: 'how_to_vote' },
    { label: 'Registered Users', path: '/registered-users', icon: 'people' }
  ];

  constructor(public router: Router) {}

  onToggle(): void {
    this.toggle.emit();
  }

  isActive(path: string): boolean {
    return this.router.url === path || this.router.url.startsWith(path + '/');
  }
}
