import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './users.schema';
import { JwtModule } from '@nestjs/jwt';
import { jwtConst } from '../const/auth.const';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConst.secret,
      signOptions: { expiresIn: '86400s' },
    }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
