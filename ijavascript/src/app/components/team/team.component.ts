import { invalid } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Member } from 'src/app/data-models/member.model';
import { DataService } from 'src/app/services/data.service';
import { mimeType } from "./mime-type.validator";

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  members:any;
  show = false;
  memberImage = '';
  memberName = '';
  jobRole = '';
  member: Member | undefined;
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getMembers().subscribe(response =>{
      console.log(response.members);
      this.members = response.members;
    });
  }
  showMember(member:any){
    this.show = true;
    this.memberImage = member.imagePath;
    this.memberName = member.name;
    this.jobRole = member.job_role;
  }
}
