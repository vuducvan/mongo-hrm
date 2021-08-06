import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { multerOptions } from '../config/multer.config';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { RequestDto } from '../middlewares/dto/request.dto';

@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  //get all user
  @Get('/all')
  getAllUser(
    @Query('currentPage') page: string,
    @Query('pageSize') size: string,
  ) {
    return this.usersService.getAllUser(page, size);
  }

  //get user by id
  @Get('/:id')
  getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  //create new user
  @UseInterceptors(FileInterceptor('avatar', multerOptions))
  @Post()
  uploadFile(
    @Body() body: CreateUserDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: RequestDto,
  ) {
    body.avatar = file.originalname;
    return this.usersService.createUser(body, req);
  }

  //update user
  @UseInterceptors(FileInterceptor('avatar', multerOptions))
  @Patch('/update/:id')
  update(
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: RequestDto,
  ) {
    body.avatar = file.originalname;
    return this.usersService.updateUser(id, body, req);
  }

  //delete user by update isDelete = 1
  @Patch('/delete/:id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
