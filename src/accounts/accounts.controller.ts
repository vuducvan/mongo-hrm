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
import { CreateAccountDto } from './dto/createAccount.dto';
import { UpdateAccountDto } from './dto/updateAccount.dto';
import { AccountsService } from './accounts.service';
import { RequestDto } from '../middlewares/dto/request.dto';

@Controller('api/accounts')
export class AccountsController {
  constructor(private readonly accountService: AccountsService) {}

  //get all account
  @Get('/all')
  getAllAccount(
    @Query('currentPage') page: string,
    @Query('pageSize') size: string,
  ) {
    return this.accountService.getAllAccount(page, size);
  }

  //get account by id
  @Get('/:id')
  getAccountById(@Param('id') id: string) {
    return this.accountService.getAccountById(id);
  }

  //create account
  @Post()
  insertAccount(@Body() body: CreateAccountDto, @Req() req: RequestDto) {
    return this.accountService.createAccount(body, req);
  }

  //update account by id
  @Patch('/update/:id')
  updateAccount(
    @Param('id') id: string,
    @Body() body: UpdateAccountDto,
    @Req() req: RequestDto,
  ): Promise<any> {
    return this.accountService.updateAccount(id, body, req);
  }

  //delete account by update isDelete = 1
  @Patch('/delete/:id')
  deleteAccount(@Param('id') id: string) {
    return this.accountService.deleteAccount(id);
  }
}
