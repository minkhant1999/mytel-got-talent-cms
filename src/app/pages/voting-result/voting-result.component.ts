import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription, interval } from 'rxjs';
import { CmsServiceService } from 'src/app/services/cms-service.service';
import { WebsocketService } from 'src/app/services/websocket.service';
import { ErrorDialogComponent } from 'src/app/shared/error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-voting-result',
  templateUrl: './voting-result.component.html',
  styleUrls: ['./voting-result.component.css'],
})
export class VotingResultComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  searchForm: FormGroup;

  votingEnabled = false;
  resultEnabled = false;
  private wsSub!: Subscription;
  private refreshSub!: Subscription;

  constructor(
    private cmsService: CmsServiceService,
    private fb: FormBuilder,
    private ws: WebsocketService,
    private dialog: MatDialog,
  ) {
    this.searchForm = this.fb.group({
      number: [''], // lowercase for convention
    });
  }

  ngOnInit(): void {
    this.getAllContestant();
    // this.cmsService.voteSwitch(null).subscribe({
    //   next: (isEnabled: boolean) => (this.votingEnabled = isEnabled),
    //   error: (err) => console.error('Error fetching voting status', err),
    // });
    const saved = localStorage.getItem('votingEnabled');
    this.votingEnabled = saved === 'true';

    const saved2 = localStorage.getItem('resultEnabled');
    this.resultEnabled = saved === 'true';
  }

  // switchVoting(enabled: boolean) {
  //   this.wsSub = this.cmsService.voteSwitch(enabled).subscribe({
  //     next: (isEnabled: boolean) => {
  //       this.votingEnabled = isEnabled;
  //       console.log('Voting status:', isEnabled);
  //     },
  //     error: (err) => console.error('Error switching vote:', err),
  //   });
  // }
  switchVoting() {
    const newValue = !this.votingEnabled;

    this.wsSub = this.cmsService.voteSwitch(newValue).subscribe({
      next: (isEnabled: boolean) => {
        this.votingEnabled = isEnabled;
        console.log('Voting status:', isEnabled);
        localStorage.setItem('votingEnabled', isEnabled.toString());
      },
      error: (err) => console.error('Error switching vote:', err),
    });
  }

  switchResult() {
    const newValue = !this.resultEnabled;

    this.wsSub = this.cmsService.resultSwitch(newValue).subscribe({
      next: (isEnabled: boolean) => {
        this.resultEnabled = isEnabled;
        console.log('Result status:', isEnabled);
        localStorage.setItem('resultEnabled', isEnabled.toString());
      },
      error: (err) => console.error('Error switching vote:', err),
    });
  }

  getAllContestant() {
    this.cmsService.participants().subscribe({
      next: (res: any) => {
        // check the code in the response body
        if (res.code === '200') {
          this.users = res.result;
          this.filteredUsers = [...this.users];
        } else {
          // show error dialog if code is not 200
          this.dialog.open(ErrorDialogComponent, {
            width: '320px',
            data: {
              message: 'Failed to load contestants. Please log in again.',
            },
          });
        }
      },
      error: (err) => {
        console.error(err);

        // fallback for network/server errors
        this.dialog.open(ErrorDialogComponent, {
          width: '320px',
          data: {
            message:
              'Failed to load contestants. Please check your network or try again later.',
          },
        });
      },
    });
  }

  // Search contestants via API
  onSearch() {
    const keyword = this.searchForm.get('number')?.value?.trim();

    if (!keyword) {
      // If empty, show all users
      this.filteredUsers = [...this.users];
      return;
    }

    this.cmsService.searchP({ keyword }).subscribe({
      next: (res: any) => {
        if (res.code === '200') {
          this.filteredUsers = res.result || [];
        } else {
          // handle API-level failure (non-200)
          this.filteredUsers = [];
          this.dialog.open(ErrorDialogComponent, {
            width: '320px',
            data: { message: 'Search failed. Please try again.' },
          });
        }
      },
      error: (err) => {
        console.error('Search API error', err);
        // show dialog for network/server errors
        this.filteredUsers = [];
        this.dialog.open(ErrorDialogComponent, {
          width: '320px',
          data: { message: 'Network error. Please check your connection.' },
        });
      },
    });
  }
}
