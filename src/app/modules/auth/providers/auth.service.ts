import { Injectable } from '@angular/core';
import { UserInfo } from 'src/app/helpers/interfaces';
import { StorageHelper } from 'src/app/helpers/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }


  signIn(email: string, password: string): UserInfo | null {
    const userInfo = StorageHelper.userInfo || {};
    if (userInfo.email === email && userInfo.password === password) {
      return userInfo;
    } else {
      return null;
    }
  }


  register(user: UserInfo) {
    
  }
}
