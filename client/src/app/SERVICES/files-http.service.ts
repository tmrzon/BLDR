import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpService } from './http-ser.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class FilesHttpService implements OnInit {

  headers = new HttpHeaders();
  size: number
  private jwt;
  env = environment

  constructor(public serHttp: HttpClient, public http: HttpService) {
  }
  ngOnInit(): void {
    this.headers = Object.assign(this.http.headers)
  }

  getFiles(): Observable<any> {
    return this.serHttp.get<any>(this.env.FILES_URL + this.http.userName, { headers: this.headers });
  }

  uploadFile(myFile, access): Observable<any> {
    return this.serHttp.post<any>(this.env.FILES_URL + this.http.userName + "/upload/" + access, myFile, { headers: this.headers });
  }
  deleteFile(fileId) {
    return this.serHttp.put<any>(this.env.FILES_URL + this.http.userName + "/delete", { fileId: fileId }, { headers: this.headers })
  }
  showDeletedFiles() {
    return this.serHttp.get<any>(this.env.FILES_URL + this.http.userName + "/showDeletedFiles", { headers: this.headers })
  }
  recovereFiles(fileId) {
    return this.serHttp.put<any>(this.env.FILES_URL + this.http.userName + "/recovereMultiFiles", { files: fileId }, { headers: this.headers })
  }
  savedMultiFilesDB(file) {
    this.size = file.size.split(" ")[0]
    let copyFile = { "files": { "files": { "name": file.imgName, "url": file.img, "size": (this.size) * 1024 * 1024 } } }
    return this.serHttp.post<any>(this.env.FILES_URL + this.http.userName + "/savedMultiFilesDB", copyFile, { headers: this.headers })

  }
  downloadFile(url): any {
    return this.serHttp.get(url, { responseType: 'blob' });
  }

  multiFilesToArchiv(files) {
    return this.serHttp.put<any>(this.env.FILES_URL + this.http.userName + "/multiFilesToArchiv", { files }, { headers: this.headers })

  }
}
