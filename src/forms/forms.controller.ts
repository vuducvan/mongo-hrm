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
import { CreateFromDto } from './dto/createFrom.dto';
import { UpdateFromDto } from './dto/updateForm.dto';
import { SubmitFormDto } from './dto/submitForm.dto';
import { ApproveFormDto } from './dto/approveForm.dto';
import { ReportFormDto } from './dto/reportFrom.dto';
import { CloseFormDto } from './dto/closeForm.dto';
import { FormsService } from './forms.service';
import { RequestDto } from '../middlewares/dto/request.dto';

@Controller('api/forms')
export class FormsController {
  constructor(private readonly formService: FormsService) {}

  //get all form
  @Get('/all')
  getAllForm(
    @Query('currentPage') page: string,
    @Query('pageSize') size: string,
  ) {
    return this.formService.getAllForm(page, size);
  }

  //get form by id
  @Get('/detail/:id')
  getFormById(@Param('id') id: string) {
    return this.formService.getFormById(id);
  }

  //create new form
  @Post()
  insertForm(@Body() body: CreateFromDto, @Req() req: RequestDto) {
    return this.formService.createForm(body, req);
  }

  //update form by id
  @Patch('/update/:id')
  updateForm(
    @Param('id') id: string,
    @Body() body: UpdateFromDto,
    @Req() req: RequestDto,
  ): Promise<any> {
    return this.formService.updateForm(body, id, req);
  }

  //delete form by id
  @Patch('/delete/:id')
  deleteForm(@Param('id') id: string) {
    return this.formService.deleteForm(id);
  }

  //submit form
  @Patch('/submit/:id')
  submitForm(
    @Param('id') id: string,
    @Body() body: SubmitFormDto,
    @Req() req: RequestDto,
  ): Promise<any> {
    return this.formService.submitForm(id, body, req);
  }

  //approve form
  @Patch('/approve/:id')
  approveForm(
    @Param('id') id: string,
    @Body() body: ApproveFormDto,
    @Req() req: RequestDto,
  ): Promise<any> {
    return this.formService.approveForm(id, body, req);
  }

  //close form
  @Patch('/close/:id')
  closeForm(
    @Param('id') id: string,
    @Body() body: CloseFormDto,
    @Req() req: RequestDto,
  ): Promise<any> {
    return this.formService.closeForm(id, body, req);
  }

  //get report about form
  @Get('/report')
  getReport(@Body() body: ReportFormDto) {
    return this.formService.getReport(body);
  }
}
