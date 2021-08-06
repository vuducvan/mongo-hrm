export class UpdateUserroleDto {
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
  updateAt: Date;
  updateBy: string;
}
