export class CreateUserroleDto {
  userId: string;
  roleName: string;
  permission: {
    screenId: string;
    url: string;
    canWrite: number;
    canRead: number;
    canUpdate: number;
    canDelete: number;
    canApprove: number;
  };
  isDelete: number;
  createAt: Date;
  updateAt: Date;
  createBy: string;
  updateBy: string;
}
