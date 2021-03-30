import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  allowedTypes = ['image/jpg', 'image/jpeg', 'image/png'];
  file: File;
  preview: string | ArrayBuffer;

  @Output() previewImage = new EventEmitter<string | ArrayBuffer>();
  @Output() uploaded = new EventEmitter();

  constructor(private readonly uploadService: UploadService) { }

  ngOnInit(): void {
  }

  readURL(file: File) {

    var reader = new FileReader();

    reader.onload = (e) => {
      this.preview =  e.target.result;
      this.previewImage.emit(this.preview);
    }

    reader.readAsDataURL(file);

  }

  handleFileChange(files: FileList) {

    if(files?.length > 0) {

      const file = files.item(0);

      if (this.allowedTypes.includes(file.type)) {

        this.file = file;

        this.readURL(this.file);

      } else {
        console.log('not valid type');
        return false;
      }

    }
  }

  handleUpload() {

    this.uploadService.uploadFile(this.file)
    .subscribe((response: any) => {

      this.uploaded.emit(response?.url);

    },
    (error) => {
      console.info('error');
    }, () => {
      console.info('handleUpload_complete');
    });

  }

}
