import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFromDto } from './dto/createFrom.dto';
import { UpdateFromDto } from './dto/updateForm.dto';
import { SubmitFormDto } from './dto/submitForm.dto';
import { ApproveFormDto } from './dto/approveForm.dto';
import { CloseFormDto } from './dto/closeForm.dto';
import { Form, FormDocument } from './forms.schema';
import { FORM_STATUS } from '../const/formStatus.enum';
import { ReportFormDto } from './dto/reportFrom.dto';
import { RequestDto } from '../middlewares/dto/request.dto';

@Injectable()
export class FormsService {
  constructor(
    @InjectModel('Form')
    private formModel: Model<FormDocument>,
  ) {}

  //get all form
  async getAllForm(currentPage: string, pageSize: string): Promise<Form[]> {
    const size = parseInt(pageSize);
    const num = parseInt(currentPage);
    return await this.formModel
      .find({ isDelete: 0 })
      .limit(size)
      .skip((num - 1) * size);
  }

  //get form by id
  async getFormById(id: string): Promise<any> {
    try {
      const Temp = await this.formModel.findOne({ _id: id, isDelete: 0 });
      if (!Temp) {
        return {
          message: 'Can not find this form',
        };
      }
      return Temp;
    } catch (error) {
      throw error;
    }
  }

  //create new form
  async createForm(body: CreateFromDto, req: RequestDto): Promise<any> {
    try {
      body.isDelete = 0;
      body.status = FORM_STATUS.NEW;
      body.createAt = new Date();
      body.updateAt = new Date();
      body.createBy = req.userId;
      body.updateBy = req.userId;
      const userIdArray = body.userId;
      for (const x in userIdArray) {
        body.userId = userIdArray[x];
        await this.formModel.create(body);
      }
      return {
        message: `Create success ${userIdArray.length} forms`,
      };
    } catch (error) {
      throw error;
    }
  }

  //update form by id
  async updateForm(
    body: UpdateFromDto,
    id: string,
    req: RequestDto,
  ): Promise<any> {
    try {
      const Temp = await this.formModel.findOne({ _id: id, isDelete: 0 });
      if (!Temp) {
        return {
          message: `Can not update this form`,
        };
      }
      body.updateAt = new Date();
      body.updateBy = req.userId;
      await this.formModel.updateOne({ _id: id }, body);
      return {
        message: 'Update success',
      };
    } catch (error) {
      throw error;
    }
  }

  //delete form by update isDelete = 1
  async deleteForm(id: string): Promise<any> {
    try {
      const Temp = await this.formModel.findOne({ _id: id, isDelete: 0 });
      if (!Temp) {
        return {
          message: 'Can not delete this form',
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

  //submit form
  async submitForm(
    id: string,
    body: SubmitFormDto,
    req: RequestDto,
  ): Promise<any> {
    try {
      const Temp = await this.formModel.findOne({ _id: id, isDelete: 0 });
      if (!Temp) {
        return {
          message: `Can not submit this form`,
        };
      }
      body.updateAt = new Date();
      body.status = FORM_STATUS.PENDING_APPROVE;
      body.updateBy = req.userId;
      await this.formModel.updateOne({ _id: id }, body);
      return {
        message: 'Submit success',
      };
    } catch (error) {
      throw error;
    }
  }

  //approve form
  async approveForm(
    id: string,
    body: ApproveFormDto,
    req: RequestDto,
  ): Promise<any> {
    try {
      const Temp = await this.formModel.findOne({ _id: id, isDelete: 0 });
      if (!Temp) {
        return {
          message: `Can not approve this form`,
        };
      }
      body.updateAt = new Date();
      body.status = FORM_STATUS.APPROVED;
      body.updateBy = req.userId;
      await this.formModel.updateOne({ _id: id }, body);
      return {
        message: 'Approve success',
      };
    } catch (error) {
      throw error;
    }
  }

  //close form
  async closeForm(
    id: string,
    body: CloseFormDto,
    req: RequestDto,
  ): Promise<any> {
    try {
      const Temp = await this.formModel.findOne({ _id: id, isDelete: 0 });
      if (!Temp) {
        return {
          message: `Can not close this form`,
        };
      }
      body.updateAt = new Date();
      body.status = FORM_STATUS.CLOSED;
      body.updateBy = req.userId;
      await this.formModel.updateOne({ _id: id }, body);
      return {
        message: 'Close success',
      };
    } catch (error) {
      throw error;
    }
  }

  //get report form
  async getReport(body: ReportFormDto): Promise<any> {
    try {
      const formReport = await this.formModel.find({
        typeOf: body.typeOf,
        status: body.status,
        isDelete: 0,
      });
      const listUserId: string[] = [];
      formReport.forEach((e) => {
        listUserId.push(e.userId);
      });
      return {
        number: formReport.length,
        userId: listUserId,
      };
    } catch (error) {
      throw error;
    }
  }
}
