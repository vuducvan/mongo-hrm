import { Module } from '@nestjs/common';
import { UserrolesController } from './userroles.controller';
import { UserrolesService } from './userroles.service';

@Module({
  controllers: [UserrolesController],
  providers: [UserrolesService]
})
export class UserrolesModule {}
