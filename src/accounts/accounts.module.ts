import { Module } from '@nestjs/common';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountSchema } from './accounts.schema';
import { JwtModule } from '@nestjs/jwt';
import { jwtConst } from '../const/auth.const';
@Module({
  imports: [
    JwtModule.register({
      secret: jwtConst.secret,
      signOptions: { expiresIn: '86400s' },
    }),
    MongooseModule.forFeature([{ name: 'Account', schema: AccountSchema }]),
  ],
  controllers: [AccountsController],
  providers: [AccountsService],
  exports: [AccountsService],
})
export class AccountsModule {}
