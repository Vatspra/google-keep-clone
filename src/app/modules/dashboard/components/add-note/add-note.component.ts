import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { FileType, List, NoteItem } from 'src/app/helpers/interfaces';
import { DashboardService } from '../../providers/dashboard.service';
// import { EventEmitter } from 'stream';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss']
})
export class AddNoteComponent implements OnInit {
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  @Output() newItemEvent = new EventEmitter<NoteItem>();

  lists: List[] = [];
  noteItem!: NoteItem;
  showNoteView = true;
  showHeader = true;
  title: string = '';
  note: string = '';
  imgSrc = '';
  expanded = false;

  constructor(
    private dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
  }

  addNotes() {
    const note: List = {
      completed: false,
      id: Date.now(),
      item: ''
    }
    this.lists.push(note);
  }


  displayListView() {
    this.showNoteView = false;
  }
  expansionPanelOpend(event: any) {
    this.showHeader = false;
  }
  expansionPanelClosed(event: any) {
    this.showHeader = true;
  }

  saveItem() {
    if (this.title) {
      const noteItem: NoteItem = {
        title: this.title,
        list: this.lists,
        note: this.note,
        img: this.imgSrc,
        id: Date.now()
      }
      this.noteItem = noteItem;
      this.newItemEvent.emit(noteItem);
      this.dashboardService.addNotes(noteItem);
      this.clear();
    }
  }

  async uploadFile(event: Event) {
    const dataUrl = await this.dashboardService.handleFileChange(event, FileType.Image);
    if (dataUrl) {
      this.imgSrc = dataUrl;
      this.accordion.openAll();
    }
  }
  stopPropagtion(event: Event) {
    event.stopPropagation();
  }

  clear() {
    this.title = '';
    this.lists = [];
    this.note = '';
    this.showNoteView = true;
    this.expanded = false;
    this.accordion.closeAll();
    this.imgSrc = '';
  }
}
