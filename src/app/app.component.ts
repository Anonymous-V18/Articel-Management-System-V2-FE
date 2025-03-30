import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { RoleResponse } from './dtos/response/roles/role.response';
import { StorageService } from './services/storage.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'articel-management-angular';

  router: Router = inject(Router);
  storageService: StorageService = inject(StorageService);
  userService: UserService = inject(UserService);

  ngOnInit(): void {
    if (this.userService.isLoggedIn()) {
      var roles: RoleResponse[] =
        this.userService.getUserDetailsFromLocalStorage().roles;
      if (roles.length > 0 && roles.some((role) => role.code === 'ADMIN')) {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/home']);
      }
    } else {
      this.storageService.clear();
      this.router.navigate(['/login']);
    }
  }
}
