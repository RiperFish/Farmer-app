import { Injectable, signal } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSignal = signal<User | null>(null);
  currentUser = this.currentUserSignal.asReadonly();

  private dummyUsers: User[] = [
    {
      id: '1',
      name: 'John Martinez',
      email: 'john@example.com',
      phone: '501-622-1234',
      district: 'Cayo',
      village: 'San Ignacio',
      status: 'verified',
      farmerId: 'BZ-001234',
      registrationDate: new Date('2024-01-15'),
      verificationDate: new Date('2024-01-20')
    },
    {
      id: '2',
      name: 'Maria Garcia',
      email: 'maria@example.com',
      phone: '501-622-5678',
      district: 'Orange Walk',
      village: 'San Pablo',
      status: 'pending',
      registrationDate: new Date('2024-11-01')
    }
  ];

  constructor() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUserSignal.set(JSON.parse(savedUser));
    }
  }

  login(email: string, password: string): boolean {
    const user = this.dummyUsers.find(u => u.email === email) || this.dummyUsers[0];
    this.currentUserSignal.set(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    return true;
  }

  logout(): void {
    this.currentUserSignal.set(null);
    localStorage.removeItem('currentUser');
  }

  register(userData: Partial<User>): User {
    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name || '',
      email: userData.email || '',
      phone: userData.phone || '',
      district: userData.district || '',
      village: userData.village || '',
      status: 'unverified',
      registrationDate: new Date()
    };
    this.dummyUsers.push(newUser);
    return newUser;
  }

  isAuthenticated(): boolean {
    return this.currentUserSignal() !== null;
  }

  isVerified(): boolean {
    const user = this.currentUserSignal();
    return user?.status === 'verified';
  }
}
