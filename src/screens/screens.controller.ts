import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateScreenDto } from './dto/createScreen.dto';
import { UpdateScreenDto } from './dto/updateScreen.dto';
import { ScreensService } from './screens.service';

@Controller('api/screens')
export class ScreensController {
  constructor(private readonly screenService: ScreensService) {}

  //get all screen
  @Get('/all')
  getAllScreen(
    @Query('currentPage') page: string,
    @Query('pageSize') size: string,
  ) {
    return this.screenService.getAllScreen(page, size);
  }

  //get screen by id
  @Get('/:id')
  getScreenById(@Param('id') id: string) {
    return this.screenService.getScreenById(id);
  }

  //create new Screen
  @Post('/create')
  insertScreen(@Body() body: CreateScreenDto) {
    return this.screenService.createScreen(body);
  }

  //update screen by id
  @Patch('/update/:id')
  updateScreen(
    @Param('id') id: string,
    @Body() body: UpdateScreenDto,
  ): Promise<any> {
    return this.screenService.updateScreen(id, body);
  }

  //delete screen by id
  @Patch('/delete/:id')
  deleteScreen(@Param('id') id: string) {
    return this.screenService.deleteScreen(id);
  }
}
