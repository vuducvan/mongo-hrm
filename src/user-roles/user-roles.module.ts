import { Module } from '@nestjs/common';
import { UserrolesController } from './user-roles.controller';
import { UserrolesService } from './user-roles.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserroleSchema } from './user-roles.schema';
import { JwtModule } from '@nestjs/jwt';
import { jwtConst } from '../const/auth.const';
@Module({
  imports: [
    JwtModule.register({
      secret: jwtConst.secret,
      signOptions: { expiresIn: '86400s' },
    }),
    MongooseModule.forFeature([{ name: 'Userrole', schema: UserroleSchema }]),
  ],
  controllers: [UserrolesController],
  providers: [UserrolesService],
})
export class UserrolesModule {}
