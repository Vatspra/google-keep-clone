// import { userInfo } from 'os';
import { Injectable } from '@angular/core';
import { FileType, NoteItem } from 'src/app/helpers/interfaces';
import { StorageHelper } from 'src/app/helpers/storage';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor() { }

  handleFileChange(event: Event, acceptFileType: FileType): Promise<any> {
    const file: File = (event.target as any).files[0];
    let fileType = file.type;
    return new Promise((resolve, reject) => {
      try {
        const reader = new FileReader();
        if (fileType.includes(acceptFileType)) {
          reader.onload = ((_) => {
            return (e: ProgressEvent) => {
              resolve(reader.result);
            };
          })(file);
        } else {
          resolve(null);
        }
        reader.readAsDataURL(file);

      } catch (_) {
        resolve(null);
      }
    });
  }

  addNotes(note: NoteItem) {
    const userInfo = StorageHelper.userInfo;
    let users = StorageHelper.users || [];
    if (userInfo) {
      const notes = userInfo && userInfo.notes || [];
      notes.push(note);
      userInfo.notes = notes;
      StorageHelper.userInfo = userInfo;

      // update in user lists
      users = users.map(user => {
        if(user.email === userInfo.email) {
          user = userInfo;
        }
        return user;
      })
      StorageHelper.users = users;
    }


  }



  updateNotes(note: NoteItem) {
    const userInfo = StorageHelper.userInfo;
    let users = StorageHelper.users || [];
    if (userInfo) {
      let notes = userInfo && userInfo.notes || [];

      notes = notes.map(n => {
        if (n.id === note.id) {
          n = note;
        }
        return n;
      });
      userInfo.notes = notes;
      StorageHelper.userInfo = userInfo;

      // update in user lists 
      users = users.map(user => {
        if(user.email === userInfo.email) {
          user = userInfo;
        }
        return user;
      })
      StorageHelper.users = users;
    }
  }

  getNotes(): NoteItem[] {
    const userInfo = StorageHelper.userInfo;
    const users = StorageHelper.users;
    let notes: NoteItem[] = []
    for(let user of users) {
      if(user.email ===  (userInfo && userInfo.email)) {
        notes = userInfo && userInfo.notes || [];
        return notes;
      }
    }

    return notes;
  }
}
