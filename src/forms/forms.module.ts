import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { FormsController } from './forms.controller';
import { FormsService } from './forms.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FormSchema } from './forms.schema';
import { JwtModule } from '@nestjs/jwt';
import { jwtConst } from '../const/auth.const';
import {
  CheckCanWrite,
  CheckCanRead,
  CheckCanUpdate,
  CheckCanDelete,
  CheckCanApprove,
  CheckCanClose,
  CheckCanGetReport,
  CheckCanSubmit,
  CheckCloseForm,
} from '../middlewares/checkRole';
import { UserroleSchema } from '../userroles/userroles.schema';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Form', schema: FormSchema }]),
    MongooseModule.forFeature([{ name: 'Userrole', schema: UserroleSchema }]),
    JwtModule.register({
      secret: jwtConst.secret,
      signOptions: { expiresIn: '86400s' },
    }),
  ],
  controllers: [FormsController],
  providers: [FormsService],
})
export class FormsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckCanRead, CheckCanGetReport)
      .forRoutes({ path: 'api/forms', method: RequestMethod.GET }); //check permission can get report
    consumer
      .apply(CheckCanRead)
      .forRoutes({ path: 'api/forms/*', method: RequestMethod.GET }); //check permission can read form normally
    consumer
      .apply(CheckCloseForm, CheckCanWrite)
      .forRoutes({ path: 'api/forms*', method: RequestMethod.POST });
    consumer
      .apply(CheckCanUpdate, CheckCanSubmit)
      .forRoutes({ path: 'api/forms/submit*', method: RequestMethod.PATCH });
    consumer
      .apply(CheckCanUpdate, CheckCanClose)
      .forRoutes({ path: 'api/forms/close*', method: RequestMethod.PATCH });
    consumer
      .apply(CheckCanDelete)
      .forRoutes({ path: 'api/forms/delete*', method: RequestMethod.PATCH });
    consumer
      .apply(CheckCanApprove)
      .forRoutes({ path: 'api/forms/approve*', method: RequestMethod.PATCH });
  }
}
