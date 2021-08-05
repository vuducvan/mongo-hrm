import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateScreenDto } from './dto/createScreen.dto';
import { UpdateScreenDto } from './dto/updateScreen.dto';
import { Screen, ScreenDocument } from './screens.schema';

@Injectable()
export class ScreensService {
  constructor(
    @InjectModel('Screen')
    private screenModel: Model<ScreenDocument>,
  ) {}

  //get all screen
  async getAllScreen(currentPage: string, pageSize: string): Promise<Screen[]> {
    const size = parseInt(pageSize);
    const num = parseInt(currentPage);
    return await this.screenModel
      .find({ isDelete: 0 })
      .limit(size)
      .skip((num - 1) * size);
  }

  //get screen by id
  async getScreenById(id: string): Promise<any> {
    try {
      const Temp = await this.screenModel.findOne({ _id: id, isDelete: 0 });
      if (!Temp) {
        return {
          message: 'Can not find this screen',
        };
      }
      return Temp;
    } catch (error) {
      throw error;
    }
  }

  //create new screen
  async createScreen(createScreenDto: CreateScreenDto): Promise<Screen> {
    try {
      createScreenDto.isDelete = 0;
      createScreenDto.createAt = new Date();
      createScreenDto.updateAt = new Date();
      return await this.screenModel.create(createScreenDto);
    } catch (error) {
      throw error;
    }
  }

  //update screen by id
  async updateScreen(
    id: string,
    updateScreenDto: UpdateScreenDto,
  ): Promise<any> {
    try {
      const Temp = await this.screenModel.findOne({ _id: id, isDelete: 0 });
      if (!Temp) {
        return {
          message: `Can not update this screen`,
        };
      }
      updateScreenDto.updateAt = new Date();
      await this.screenModel.updateOne({ _id: id }, updateScreenDto);
      return {
        message: 'Update success',
      };
    } catch (error) {
      throw error;
    }
  }

  //delete screen by update isDelete = 1
  async deleteScreen(id: string): Promise<any> {
    try {
      const Temp = await this.screenModel.findOne({ _id: id, isDelete: 0 });
      if (!Temp) {
        return {
          message: 'Can not delete this screen',
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
