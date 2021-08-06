import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserroleDto } from './dto/createUserrole.dto';
import { UpdateUserroleDto } from './dto/updateUserrole.dto';
import { Userrole, UserroleDocument } from './userroles.schema';
import { JwtService } from '@nestjs/jwt';
import { TokenDto } from '../middlewares/dto/token.dto';
import { RequestDto } from '../middlewares/dto/request.dto';
@Injectable()
export class UserrolesService {
  constructor(
    @InjectModel('Userrole')
    private userroleModel: Model<UserroleDocument>,
    private jwtService: JwtService,
  ) {}

  //get all userrole
  async getAllUserrole(
    currentPage: string,
    pageSize: string,
  ): Promise<Userrole[]> {
    const size = parseInt(pageSize);
    const num = parseInt(currentPage);
    return await this.userroleModel
      .find({ isDelete: 0 })
      .limit(size)
      .skip((num - 1) * size);
  }

  //get userrole by id
  async getUserroleById(id: string): Promise<any> {
    try {
      const Temp = await this.userroleModel.findOne({ _id: id, isDelete: 0 });
      if (!Temp) {
        return {
          message: 'Can not find this userrole',
        };
      }
      return Temp;
    } catch (error) {
      throw error;
    }
  }

  //create new userrole
  async createUserrole(
    body: CreateUserroleDto,
    req: RequestDto,
  ): Promise<Userrole> {
    try {
      //get token in request.header
      const token = req.header('token');
      const payload: TokenDto = await this.jwtService.verifyAsync(token); //verify token to get userId
      body.isDelete = 0;
      body.createAt = new Date();
      body.updateAt = new Date();
      body.createBy = payload.userId;
      return await this.userroleModel.create(body);
    } catch (error) {
      throw error;
    }
  }

  //update userrole by id
  async updateUserrole(
    id: string,
    body: UpdateUserroleDto,
    req: RequestDto,
  ): Promise<any> {
    try {
      //get token in request.header
      const token = req.header('token');
      const payload: TokenDto = await this.jwtService.verifyAsync(token); //verify token to get userId
      const Temp = await this.userroleModel.findOne({ _id: id, isDelete: 0 });
      if (!Temp) {
        return {
          message: `Can not update this userrole`,
        };
      }
      body.updateAt = new Date();
      body.updateBy = payload.userId;
      await this.userroleModel.updateOne({ _id: id }, body);
      return {
        message: 'Update success',
      };
    } catch (error) {
      throw error;
    }
  }

  //delete userrole by update isDelete = 1
  async deleteUserrole(id: string): Promise<any> {
    try {
      const Temp = await this.userroleModel.findOne({ _id: id, isDelete: 0 });
      if (!Temp) {
        return {
          message: 'Can not delete this userrole',
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
