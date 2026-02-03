import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CmsServiceService } from 'src/app/services/cms-service.service';
@Component({
  selector: 'app-registered-users',
  templateUrl: './registered-users.component.html',
  styleUrls: ['./registered-users.component.css'],
})
export class RegisteredUsersComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  searchForm: FormGroup;

  constructor(
    private cmsService: CmsServiceService,
    private fb: FormBuilder,
  ) {
    this.searchForm = this.fb.group({
      Number: [''],
    });
  }

  ngOnInit(): void {
    this.getAllUser();
  }

  getAllUser() {
    this.cmsService.guest().subscribe((res: any) => {
      if (res.success) {
        this.users = res.result.users;
        this.filteredUsers = [...this.users];
      }
    });
  }

  onSearch() {
    const keyword = this.searchForm.get('Number')?.value?.trim() || '';
    console.log(keyword, 'this is the keyword');

    if (!keyword) {
      this.getAllUser(); // show all if search is empty
      return;
    }

    this.cmsService.searchG({ keyword }).subscribe((res: any) => {
      if (res.success) {
        this.filteredUsers = res.result || [];
      } else {
        this.filteredUsers = [];
      }
    });
  }
}
