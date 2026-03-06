import { Injectable } from '@angular/core';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

@Injectable({ providedIn: 'root' })
export class FileService {
  fileToUpload: File | null = null;

  parseJsonFile(callback: Function) {
    if (this.fileToUpload != null) {
      if (window.File && window.FileReader && window.FileList && window.Blob) {
        const reader = new FileReader();

        reader.onload = (event) => {
          if (!event.target?.result) {
            console.error('No file content read.');
            return;
          }
          const buffer = event.target.result as ArrayBuffer;

          JSZip.loadAsync(buffer)
            .then(zip => {
              const fileInZip = zip.file('bankn.json');
              if (fileInZip) {
                return fileInZip.async('string');
              } else {
                throw new Error('bankn.json not found in zip.');
              }
            })
            .then(content => {
              const object = JSON.parse(content);
              callback(object);
            })
            .catch(() => {
              // If it fails at any point (not a zip, no bankn.json, or not valid json inside zip)
              // we assume it may be a plain json file.
              try {
                const text = new TextDecoder().decode(buffer);
                const object = JSON.parse(text);
                callback(object);
              } catch (e) {
                alert('File must be a bankn zip file or a valid JSON file.');
                console.error('Failed to parse file as zip or json.', e);
              }
            });
        };

        reader.readAsArrayBuffer(this.fileToUpload);
      } else {
        alert('The File APIs are not fully supported in this browser.');
      }
    } else {
      console.error('No file selected.');
    }
  }

  downloadZipFile(object: Object, filename = 'bankn.zip') {
    const zip = new JSZip();
    const json = JSON.stringify(object);
    zip.file('bankn.json', json);

    zip.generateAsync({ type: 'blob' }).then(function (content) {
      saveAs(content, filename);
    });
  }
}
