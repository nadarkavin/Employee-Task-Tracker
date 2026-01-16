import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private USER_KEY = 'current_user_name';

  setCurrentUser(name: string): void {
    localStorage.setItem(this.USER_KEY, name.trim());
  }

  getCurrentUser(): string | null {
    return localStorage.getItem(this.USER_KEY);
  }

  clearCurrentUser(): void {
    localStorage.removeItem(this.USER_KEY);
  }
}