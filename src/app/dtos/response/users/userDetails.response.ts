import {RoleResponse} from "../roles/role.response";

export class UserDetailsResponse {
  id: number;
  username: string;
  roles: RoleResponse[];

  constructor(data: UserDetailsResponse) {
    this.id = data.id;
    this.username = data.username;
    this.roles = data.roles;
  }

};
