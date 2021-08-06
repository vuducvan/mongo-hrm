import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { UserrolesModule } from './userroles/userroles.module';
import { ScreensModule } from './screens/screens.module';
import { FormsModule } from './forms/forms.module';
import { AccountsModule } from './accounts/accounts.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UsersModule,
    UserrolesModule,
    ScreensModule,
    FormsModule,
    AccountsModule,
    MongooseModule.forRoot('mongodb://localhost/hrm-project'),
    AuthModule,
  ],
})
export class AppModule {}
