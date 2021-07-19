import { DashboardService } from './../../providers/dashboard.service';
import { Component, Input, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { List, NoteItem } from 'src/app/helpers/interfaces';
import { StorageHelper } from 'src/app/helpers/storage';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  @Input() noteItem!: NoteItem;
  constructor(
    private dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
  }

  matCheckBoxChange(event: MatCheckboxChange, list: List) {
    list.completed = event.checked;
    const lists = this.noteItem.list || [];
    for(let l of lists) {
      if(l.id === list.id) {
        l = list;
        break;
      }
    }
    this.noteItem.list = lists;
    this.dashboardService.updateNotes(this.noteItem);
  }

}
