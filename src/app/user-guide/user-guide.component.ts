import { Component, OnInit } from '@angular/core';
// import { PdfViewerModule } from 'ng2-pdf-viewer';
@Component({
  selector: 'app-user-guide',
  templateUrl: './user-guide.component.html',
  styleUrls: ['./user-guide.component.css']
})
export class UserGuideComponent implements OnInit {
src:any
  constructor() { }

  ngOnInit(): void {
    // this.src='./assets/pdfView/SocialDistancingUserManual.pdf'
    // file: ng5-pdf-viewer-ui/src/app/app.component.ts
    this.src= '../assets/SocialDistancingUserManual.pdf';
  }

}
