import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CmsServiceService } from 'src/app/services/cms-service.service';

@Component({
  selector: 'app-voting-result',
  templateUrl: './voting-result.component.html',
  styleUrls: ['./voting-result.component.css'],
})
export class VotingResultComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  searchForm: FormGroup;

  constructor(
    private cmsService: CmsServiceService,
    private fb: FormBuilder,
  ) {
    this.searchForm = this.fb.group({
      number: [''], // lowercase for convention
    });
  }

  ngOnInit(): void {
    this.getAllContestant();
  }

  // Fetch all contestants/users
  getAllContestant() {
    this.cmsService.participants().subscribe({
      next: (res: any) => {
        if (res.success) {
          this.users = res.result.candidates;
          this.filteredUsers = [...this.users];
        }
      },
      error: (err) => console.error('Error fetching contestants', err),
    });
  }

  // Search contestants via API
  onSearch() {
    const keyword = this.searchForm.get('number')?.value?.trim();
    if (!keyword) {
      // If empty, show all
      this.filteredUsers = [...this.users];
      return;
    }

    this.cmsService.searchP({ keyword }).subscribe({
      next: (res: any) => {
        this.filteredUsers = res.result || [];
      },
      error: (err) => {
        console.error('Search error', err);
        this.filteredUsers = [];
      },
    });
  }
}
