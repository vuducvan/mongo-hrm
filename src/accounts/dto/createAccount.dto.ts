export class CreateAccountDto {
  userId: string;
  username: string;
  password: string;
  isDelete: number;
  createAt: Date;
  updateAt: Date;
  createBy: string;
  updateBy: string;
}
