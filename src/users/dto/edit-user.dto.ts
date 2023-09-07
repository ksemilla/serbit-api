export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export class EditUserDto {
  email: string;
  firstName: string;
  lastName: string;
  nickName: string;
  role: UserRole;
}
