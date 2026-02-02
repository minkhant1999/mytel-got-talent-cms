import { Component, OnInit } from '@angular/core';
import { CmsServiceService } from 'src/app/services/cms-service.service';
@Component({
  selector: 'app-registered-users',
  templateUrl: './registered-users.component.html',
  styleUrls: ['./registered-users.component.css'],
})
export class RegisteredUsersComponent implements OnInit {
  constructor(private cmsService: CmsServiceService) {}
  ngOnInit(): void {
    this.getAllUser();
  }
  getAllUser() {
    const name = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    this.cmsService.guest({ name, password }).subscribe((data: any) => {
      console.log(data);
    });
  }
}
