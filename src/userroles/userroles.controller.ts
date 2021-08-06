import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { UserrolesService } from './userroles.service';
import { CreateUserroleDto } from './dto/createUserrole.dto';
import { UpdateUserroleDto } from './dto/updateUserrole.dto';
import { RequestDto } from '../middlewares/dto/request.dto';

@Controller('api/userroles')
export class UserrolesController {
  constructor(private userrolesService: UserrolesService) {}

  //get all userrole
  @Get('/all')
  getAllUser(
    @Query('currentPage') page: string,
    @Query('pageSize') size: string,
  ) {
    return this.userrolesService.getAllUserrole(page, size);
  }

  //get userrole by id
  @Get('/:id')
  getUserById(@Param('id') id: string) {
    return this.userrolesService.getUserroleById(id);
  }

  //create userrole
  @Post()
  uploadFile(@Body() body: CreateUserroleDto, @Req() req: RequestDto) {
    return this.userrolesService.createUserrole(body, req);
  }

  //update userrole by id
  @Patch('/update/:id')
  update(
    @Param('id') id: string,
    @Body() body: UpdateUserroleDto,
    @Req() req: RequestDto,
  ) {
    return this.userrolesService.updateUserrole(id, body, req);
  }

  //delete userrole by update isDelete = 1
  @Patch('/delete/:id')
  deleteUser(@Param('id') id: string) {
    return this.userrolesService.deleteUserrole(id);
  }
}
