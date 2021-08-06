import { Module } from '@nestjs/common';
import { ScreensController } from './screens.controller';
import { ScreensService } from './screens.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ScreenSchema } from './screens.schema';
import { JwtModule } from '@nestjs/jwt';
import { jwtConst } from '../const/auth.const';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConst.secret,
      signOptions: { expiresIn: '86400s' },
    }),
    MongooseModule.forFeature([{ name: 'Screen', schema: ScreenSchema }]),
  ],
  controllers: [ScreensController],
  providers: [ScreensService],
})
export class ScreensModule {}
