import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { User, UserDocument } from './users.schema';
import { JwtService } from '@nestjs/jwt';
import { TokenDto } from '../middlewares/dto/token.dto';
import { RequestDto } from '../middlewares/dto/request.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User')
    private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  //get all user
  async getAllUser(currentPage: string, pageSize: string): Promise<User[]> {
    const size = parseInt(pageSize);
    const num = parseInt(currentPage);
    return await this.userModel
      .find({ isDelete: 0 })
      .limit(size)
      .skip((num - 1) * size);
  }

  //get user by id
  async getUserById(id: string): Promise<any> {
    try {
      const Temp = await this.userModel.findOne({ _id: id, isDelete: 0 });
      if (!Temp) {
        return {
          message: 'Can not find this user',
        };
      }
      return Temp;
    } catch (error) {
      throw error;
    }
  }

  //create new user
  async createUser(body: CreateUserDto, req: RequestDto): Promise<User> {
    try {
      //get token in request.header
      const token = req.header('token');
      const payload: TokenDto = await this.jwtService.verifyAsync(token); //verify token to get userId
      body.isDelete = 0;
      body.createAt = new Date();
      body.updateAt = new Date();
      body.createBy = payload.userId;
      return await this.userModel.create(body);
    } catch (error) {
      throw error;
    }
  }

  //update user by id
  async updateUser(
    id: string,
    body: UpdateUserDto,
    req: RequestDto,
  ): Promise<any> {
    try {
      //get token in request.header
      const token = req.header('token');
      const payload: TokenDto = await this.jwtService.verifyAsync(token); //verify token to get userId
      const Temp = await this.userModel.findOne({ _id: id, isDelete: 0 });
      if (!Temp) {
        return {
          message: `Can not update this user`,
        };
      }
      body.updateBy = payload.userId;
      body.updateAt = new Date();
      await this.userModel.updateOne({ _id: id }, body);
      return {
        message: 'Update success',
      };
    } catch (error) {
      throw error;
    }
  }

  //delete user by update isDelete = 1
  async deleteUser(id: string): Promise<any> {
    try {
      const Temp = await this.userModel.findOne({ _id: id, isDelete: 0 });
      if (!Temp) {
        return {
          message: 'Can not delete this user',
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
