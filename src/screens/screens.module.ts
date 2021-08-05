import { Module } from '@nestjs/common';
import { ScreensController } from './screens.controller';
import { ScreensService } from './screens.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ScreenSchema } from './screens.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Screen', schema: ScreenSchema }]),
  ],
  controllers: [ScreensController],
  providers: [ScreensService],
})
export class ScreensModule {}
