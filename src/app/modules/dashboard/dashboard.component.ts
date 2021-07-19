import { DashboardService } from './providers/dashboard.service';
import { Component, OnInit } from '@angular/core';
import { NoteItem } from 'src/app/helpers/interfaces';
import { StorageHelper } from 'src/app/helpers/storage';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  notes: NoteItem[] = [];
  constructor(
    private dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
    this.notes = this.dashboardService.getNotes();
  }

  addNewItem(value: NoteItem) {
    this.notes.unshift(value);
  }

  search(value: string) {
    const allNotes = this.dashboardService.getNotes() || [];
    value = value && value.trim() ;
    if(!value) {
      this.notes = allNotes;
    }
    value = value && value.toLowerCase();
    const notes = allNotes.filter(note => {
      if (note.title && note.title.toLowerCase().includes(value)) {
        return true;
      } else if (note.note && note.note.toLowerCase().includes(value)) {
        return true;
      } else if (note.list && note.list.length) {
        for (const list of note.list) {
          if (list && list.item && list.item.toLowerCase().includes(value)) {
            return true;
          }
        }
      }
      return false;
    });

    this.notes = notes;

  }

}
