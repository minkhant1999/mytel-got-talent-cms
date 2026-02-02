import { Component } from '@angular/core';
import { CmsServiceService } from 'src/app/services/cms-service.service';
@Component({
  selector: 'app-registered-users',
  templateUrl: './registered-users.component.html',
  styleUrls: ['./registered-users.component.css'],
})
export class RegisteredUsersComponent {
  constructor(private cmsService: CmsServiceService) {}
}
