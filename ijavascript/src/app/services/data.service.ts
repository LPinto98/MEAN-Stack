import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Member } from "../data-models/member.model";
@Injectable ({ providedIn: "root" })
export class DataService {
  constructor(private http: HttpClient){}

  getData() {
    return this.http.get<{name: string, balance: string, transactions:object}>("http://localhost:3000/api/content/dashboard");
  }
  getMembers() {
    return this.http.get<{members:Array<any>}>("http://localhost:3000/api/content/members");
  }

  addTeamMember(name: string, job_role: string, image: File) {
    const postData = new FormData();
    postData.append("name", name);
    postData.append("job_role", job_role);
    postData.append("image", image, name);
    this.http
      .post<{ message: string; member: Member }>(
        "http://localhost:3000/api/content/members",
        postData
      )
      .subscribe(responseData => {
        console.log(responseData);
      });
  }
}
