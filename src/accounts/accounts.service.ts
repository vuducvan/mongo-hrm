import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateAccountDto } from './dto/createAccount.dto';
import { UpdateAccountDto } from './dto/updateAccount.dto';
import { Account, AccountDocument } from './accounts.schema';
import { JwtService } from '@nestjs/jwt';
import { TokenDto } from '../middlewares/dto/token.dto';
import { RequestDto } from '../middlewares/dto/request.dto';
@Injectable()
export class AccountsService {
  constructor(
    @InjectModel('Account')
    private accountModel: Model<AccountDocument>,
    private jwtService: JwtService,
  ) {}

  //get all account
  async getAllAccount(
    currentPage: string,
    pageSize: string,
  ): Promise<Account[]> {
    const size = parseInt(pageSize);
    const num = parseInt(currentPage);
    return await this.accountModel
      .find({ isDelete: 0 })
      .limit(size)
      .skip((num - 1) * size);
  }

  //get account by id
  async getAccountById(id: string): Promise<any> {
    try {
      const Temp = await this.accountModel.findOne({ _id: id, isDelete: 0 });
      if (!Temp) {
        return {
          message: 'Can not find this account',
        };
      }
      return Temp;
    } catch (error) {
      throw error;
    }
  }

  //find account by username
  async findOneAccount(username: string): Promise<Account | undefined> {
    return this.accountModel.findOne({ username: username });
  }

  //create new account
  async createAccount(
    body: CreateAccountDto,
    req: RequestDto,
  ): Promise<Account> {
    try {
      //get token in request.header
      const token = req.header('token');
      const payload: TokenDto = await this.jwtService.verifyAsync(token); //verify token to get userId
      body.isDelete = 0;
      body.createAt = new Date();
      body.updateAt = new Date();
      body.createBy = payload.userId;
      const salt = await bcrypt.genSalt(10);
      body.password = await bcrypt.hash(body.password, salt);
      return await this.accountModel.create(body);
    } catch (error) {
      throw error;
    }
  }

  //update account by id
  async updateAccount(
    id: string,
    body: UpdateAccountDto,
    req: RequestDto,
  ): Promise<any> {
    try {
      //get token in request.header
      const token = req.header('token');
      const payload: TokenDto = await this.jwtService.verifyAsync(token); //verify token to get userId
      const Temp = await this.accountModel.findOne({ _id: id, isDelete: 0 });
      if (!Temp) {
        return {
          message: `Can not update this account`,
        };
      }
      body.updateBy = payload.userId;
      body.updateAt = new Date();
      const salt = await bcrypt.genSalt(10);
      body.password = await bcrypt.hash(body.password, salt);
      await this.accountModel.updateOne({ _id: id }, body);
      return {
        message: 'Update success',
      };
    } catch (error) {
      throw error;
    }
  }

  //delete account by update isDelete = 1
  async deleteAccount(id: string): Promise<any> {
    try {
      const Temp = await this.accountModel.findOne({ _id: id, isDelete: 0 });
      if (!Temp) {
        return {
          message: 'Can not delete this account',
        };
      }
      Temp.isDelete = 1;
      Temp.save();
      return {
        message: 'Delete success',
      };
    } catch (error) {
      throw error;
    }
  }
}
