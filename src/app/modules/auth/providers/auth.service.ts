import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { userInfo } from 'os';
import { UserInfo } from 'src/app/helpers/interfaces';
import { StorageHelper } from 'src/app/helpers/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private snackBar: MatSnackBar
  ) { }


  signIn(email: string, password: string): UserInfo | null {
    const users = StorageHelper.users || [];
    if (users && users.length) {
      for (const user of users) {
        if (user.email === email && user.password === password) {
          StorageHelper.userInfo = user;
          return user;
        }
      }
    }
    return null;
  }


  register(user: UserInfo): UserInfo | null {
    const users = StorageHelper.users || [];
    const isUserExists = this.isUserExists(user.email);
    if (isUserExists) {
      return null;
    } else {
      // update register users
      users.push(user);
      StorageHelper.users = users;

      // save loggedin user
      StorageHelper.userInfo = user;
      return user
    }
  }


  isUserExists(email: string): boolean {
    const users = StorageHelper.users || [];
    for (const user of users) {
      if (user.email == email) {
        return true;
      }
    }

    return false;
  }

  openSnackbar(text: string) {
    this.snackBar.open(text, '', {
      duration: 5 * 1000
    });
  }
}
