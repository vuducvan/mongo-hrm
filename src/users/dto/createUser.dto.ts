export class CreateUserDto {
  employeeId: string;
  managerId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  avatar: string;
  department: string;
  identificationNumber: string;
  insuranceNumber: string;
  isDelete: number;
  createAt: Date;
  updateAt: Date;
  createBy: string;
  updateBy: string;
}
