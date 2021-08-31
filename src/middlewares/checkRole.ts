import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { FORM_STATUS } from '../const/formStatus.enum';
import { ROLE } from '../const/role.const';
import { TokenDto } from './dto/token.dto';
import { RequestDto } from './dto/request.dto';
import { UserroleDocument } from '../user-roles/user-roles.schema';
import { FormDocument } from '../forms/forms.schema';
//check permission can write
@Injectable()
export class CheckCanWrite implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
    @InjectModel('Userrole')
    private userroleModel: Model<UserroleDocument>,
  ) {}
  async use(req: RequestDto, res: Response, next: NextFunction) {
    try {
      //get token in request.header
      const token = req.header('token');
      const payload: TokenDto = await this.jwtService.verifyAsync(token); //verify token to get userId
      let check = false;
      const roleCheck = await this.userroleModel.find({
        userId: payload.userId,
      });
      for (const x in roleCheck) {
        for (const i in roleCheck[x].permission) {
          if (
            !check &&
            roleCheck[x].permission[i].canWrite &&
            req.originalUrl.startsWith(roleCheck[x].permission[i].url) //check permission about screen through req.url
          ) {
            check = true;
          }
        }
      }
      if (!check) {
        throw new HttpException(
          {
            status: HttpStatus.FORBIDDEN,
            error: 'Permission deny',
          },
          403,
        );
      } else {
        req.userId = payload.userId; //return a userId to response to update createBy, updateBy fields
        next();
      }
    } catch (error) {
      throw error;
    }
  }
}

//check permission can read
@Injectable()
export class CheckCanRead implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
    @InjectModel('Userrole')
    private userroleModel: Model<UserroleDocument>,
  ) {}
  async use(req: RequestDto, res: Response, next: NextFunction) {
    try {
      //get token in request.header
      const token = req.header('token');
      const payload: TokenDto = await this.jwtService.verifyAsync(token); //verify token to get userId
      let check = false;
      let roleArray: string[] = [];
      const roleCheck = await this.userroleModel.find({
        userId: payload.userId,
      });
      for (const x in roleCheck) {
        roleArray = [...roleCheck[x].roleName];
        for (const i in roleCheck[x].permission) {
          if (
            !check &&
            roleCheck[x].permission[i].canRead &&
            req.originalUrl.startsWith(roleCheck[x].permission[i].url) //check permission about screen through req.url
          ) {
            check = true;
          }
        }
      }
      if (!check) {
        throw new HttpException(
          {
            status: HttpStatus.FORBIDDEN,
            error: 'Permission deny',
          },
          403,
        );
      } else {
        console.log(roleArray);
        req.roleName = roleArray;
        req.userId = payload.userId; //return a userId to response to update createBy, updateBy fields
        next();
      }
    } catch (error) {
      throw error;
    }
  }
}

//check permission can update
@Injectable()
export class CheckCanUpdate implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
    @InjectModel('Userrole')
    private userroleModel: Model<UserroleDocument>,
  ) {}
  async use(req: RequestDto, res: Response, next: NextFunction) {
    try {
      //get token in request.header
      const token = req.header('token');
      const payload: TokenDto = await this.jwtService.verifyAsync(token); //verify token to get userId
      let check = false;
      let roleArray: string[] = [];
      const roleCheck = await this.userroleModel.find({
        userId: payload.userId,
      });
      for (const x in roleCheck) {
        roleArray = [...roleCheck[x].roleName];
        for (const i in roleCheck[x].permission) {
          if (
            !check &&
            roleCheck[x].permission[i].canUpdate &&
            req.originalUrl.startsWith(roleCheck[x].permission[i].url) //check permission about screen through req.url
          ) {
            check = true;
          }
        }
      }
      if (!check) {
        throw new HttpException(
          {
            status: HttpStatus.FORBIDDEN,
            error: 'Permission deny',
          },
          403,
        );
      } else {
        req.roleName = roleArray;
        req.userId = payload.userId; //return a userId to response to update createBy, updateBy fields
        next();
      }
    } catch (error) {
      throw error;
    }
  }
}

//check permission can delete
@Injectable()
export class CheckCanDelete implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
    @InjectModel('Userrole')
    private userroleModel: Model<UserroleDocument>,
  ) {}
  async use(req: RequestDto, res: Response, next: NextFunction) {
    try {
      //get token in request.header
      const token = req.header('token');
      const payload: TokenDto = await this.jwtService.verifyAsync(token); //verify token to get userId
      let check = false;
      const roleCheck = await this.userroleModel.find({
        userId: payload.userId,
      });
      for (const x in roleCheck) {
        for (const i in roleCheck[x].permission) {
          if (
            !check &&
            roleCheck[x].permission[i].canDelete &&
            req.originalUrl.startsWith(roleCheck[x].permission[i].url) //check permission about screen through req.url
          ) {
            check = true;
          }
        }
      }
      if (!check) {
        throw new HttpException(
          {
            status: HttpStatus.FORBIDDEN,
            error: 'Permission deny',
          },
          403,
        );
      } else {
        req.userId = payload.userId; //return a userId to response to update createBy, updateBy fields
        next();
      }
    } catch (error) {
      throw error;
    }
  }
}

//check permisison can approve
@Injectable()
export class CheckCanApprove implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
    @InjectModel('Userrole')
    private userroleModel: Model<UserroleDocument>,
  ) {}
  async use(req: RequestDto, res: Response, next: NextFunction) {
    try {
      //get token in request.header
      const token = req.header('token');
      const payload: TokenDto = await this.jwtService.verifyAsync(token); //verify token to get userId
      let check = false;
      const roleCheck = await this.userroleModel.find({
        userId: payload.userId,
      });
      for (const x in roleCheck) {
        for (const i in roleCheck[x].permission) {
          if (
            !check &&
            roleCheck[x].permission[i].canApprove &&
            req.originalUrl.startsWith(roleCheck[x].permission[i].url) //check permission about screen through req.url
          ) {
            check = true;
          }
        }
      }
      if (!check) {
        throw new HttpException(
          {
            status: HttpStatus.FORBIDDEN,
            error: 'Permission deny',
          },
          403,
        );
      } else {
        req.userId = payload.userId; //return a userId to response to update createBy, updateBy fields
        next();
      }
    } catch (error) {
      throw error;
    }
  }
}

//check permission can close form
@Injectable()
export class CheckCanClose implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
    @InjectModel('Userrole')
    private userroleModel: Model<UserroleDocument>,
  ) {}
  async use(req: RequestDto, res: Response, next: NextFunction) {
    try {
      //get token in request.header
      const token = req.header('token');
      const payload: TokenDto = await this.jwtService.verifyAsync(token); //verify token to get userId
      const roleCheck = await this.userroleModel.find({
        userId: payload.userId,
      });
      let check = false;
      for (const x in roleCheck) {
        if (!check && roleCheck[x].roleName.includes(ROLE.HR)) {
          check = true;
        }
      }
      if (!check) {
        throw new HttpException(
          {
            status: HttpStatus.FORBIDDEN,
            error: 'Permission deny',
          },
          403,
        );
      } else {
        next();
      }
    } catch (error) {
      throw error;
    }
  }
}

//check if user have a form not close yet
@Injectable()
export class CheckCloseForm implements NestMiddleware {
  constructor(
    @InjectModel('Form')
    private formModel: Model<FormDocument>,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = JSON.parse(JSON.stringify(req.body)); //get userId from req.body use JSON.parse
      const FormClose = await this.formModel.find({
        userId: userId,
        isDelete: 0,
      });
      if (FormClose.length) {
        for (const x in FormClose) {
          //check status of form, if it different close, not next();
          if (FormClose[x].status !== FORM_STATUS.CLOSED) {
            throw new HttpException(
              {
                status: HttpStatus.BAD_REQUEST,
                error: `${FormClose[x].userId} has a form not closed yet`,
              },
              400,
            );
          }
        }
      }
      next();
    } catch (error) {
      throw error;
    }
  }
}

//check permission can get report about form
@Injectable()
export class CheckCanGetReport implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
    @InjectModel('Userrole')
    private userroleModel: Model<UserroleDocument>,
  ) {}
  async use(req: RequestDto, res: Response, next: NextFunction) {
    try {
      //get token in request.header
      const token = req.header('token');
      const payload: TokenDto = await this.jwtService.verifyAsync(token); //verify token to get userId
      const UserRoleTemp = await this.userroleModel.find({
        userId: payload.userId,
        isDelete: 0,
      });
      let check = false;
      let roleArray: string[] = [];
      for (const x in UserRoleTemp) {
        roleArray = [...UserRoleTemp[x].roleName];
        if (
          //check role if it were hr or admin, next();
          !check &&
          (UserRoleTemp[x].roleName.includes(ROLE.HR) ||
            UserRoleTemp[x].roleName.includes(ROLE.ADMIN))
        ) {
          check = true;
        }
      }
      if (!check) {
        throw new HttpException(
          {
            status: HttpStatus.FORBIDDEN,
            error: 'Permission deny',
          },
          403,
        );
      } else {
        req.roleName = roleArray;
        next();
      }
    } catch (error) {
      throw error;
    }
  }
}

//check permission can submit form
@Injectable()
export class CheckCanSubmit implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
    @InjectModel('Form')
    private formModel: Model<FormDocument>,
  ) {}
  async use(req: RequestDto, res: Response, next: NextFunction) {
    try {
      let check = false;
      const id = req.params[0].replace('/', '');
      const FormCheck = await this.formModel.find({
        _id: id,
        isDelete: 0,
      });
      if (FormCheck.length) {
        for (const x in FormCheck) {
          //check if userId different form.userId find above
          if (!check && FormCheck[x].userId === req.userId) {
            check = true;
          }
        }
      }
      if (!check) {
        throw new HttpException(
          {
            status: HttpStatus.FORBIDDEN,
            error: 'Permission deny',
          },
          403,
        );
      } else {
        next();
      }
    } catch (error) {
      throw error;
    }
  }
}
