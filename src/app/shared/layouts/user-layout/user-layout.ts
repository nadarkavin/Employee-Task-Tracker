import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  template: `
    <app-navbar role="user"></app-navbar>
    <router-outlet></router-outlet>
  `
})
export class UserLayoutComponent {}