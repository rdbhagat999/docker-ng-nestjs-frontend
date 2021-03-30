import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-preview',
  templateUrl: './upload-preview.component.html',
  styleUrls: ['./upload-preview.component.scss']
})
export class UploadPreviewComponent implements OnInit {

  @Input() preview: string | ArrayBuffer;

  constructor() { }

  ngOnInit(): void {
  }

}
