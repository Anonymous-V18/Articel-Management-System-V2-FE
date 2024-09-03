import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginDTO } from '../../dtos/request/users/login.dto';
import { BaseResponse } from '../../dtos/response/BaseResponse/base.response';
import { RoleResponse } from '../../dtos/response/roles/role.response';
import { LoginResponse } from '../../dtos/response/users/login.response';
import { UserDetailsResponse } from '../../dtos/response/users/userDetails.response';
import { StorageService } from '../../services/storage.service';
import { TokenService } from '../../services/token.service';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm') loginForm!: NgForm;

  username: string;
  password: string;
  private toastConfig = {
    closeButton: true,
    progressBar: true,
    timeOut: 3000,
  };

  constructor(
    private router: Router,
    private userService: UserService,
    private tokenService: TokenService,
    private toastrService: ToastrService,
    private storageService: StorageService
  ) {
    this.username = '';
    this.password = '';
  }

  ngOnInit() {
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
    }
  }

  onSubmit() {
    const loginDTO: LoginDTO = {
      username: this.username,
      password: this.password,
    };

    this.userService.login(loginDTO).subscribe({
      next: (response: BaseResponse<LoginResponse>) => {
        const token = response.result.accessToken;
        this.tokenService.saveToken(token);
        this.getMyInfo();
      },
      complete: () => {},
      error: (error: any) => {
        debugger
        this.toastrService.error(error.error.message, 'Error', this.toastConfig);
      },
    });
  }

  getMyInfo() {
    this.userService.getMyInfo().subscribe({
      next: (response: BaseResponse<UserDetailsResponse>) => {
        const userDetailsResponse: UserDetailsResponse = response.result;
        this.userService.saveUserDetails(userDetailsResponse);
        this.toastrService.success(
          'Login successful',
          'Success',
          this.toastConfig
        );
        const isAdmin = userDetailsResponse.roles.some(
          (role) => role.code === 'ADMIN'
        );
        if (isAdmin) {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/home']);
        }
      },
      complete: () => {},
      error: (error: any) => {
        this.toastrService.error(error.error.message, 'Error', this.toastConfig);
        this.router.navigate(['/login']);
      },
    });
  }
}
