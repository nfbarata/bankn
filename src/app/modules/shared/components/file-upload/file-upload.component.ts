import { Component, OnInit } from '@angular/core';
import { FileService } from '../../../../services/file.service';

@Component({
    selector: 'file-upload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.css'],
    standalone: false
})
export class FileUploadComponent implements OnInit {

  //fileToUpload: File = null;
  
  constructor(
     private fileService: FileService
  ) { }

  ngOnInit() {
  }

  handleFileInput(event: any) {
    if(event.target!=null && event.target.files!=null)
      this.fileService.fileToUpload = event.target.files.item(0);
    else
      console.error("No files to process");
  }
}