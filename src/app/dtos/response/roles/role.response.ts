export class RoleResponse {
  id: number;
  name: string;
  code: string;

  constructor(data: RoleResponse) {
    this.id = data.id;
    this.name = data.name;
    this.code = data.code;
  }
}
