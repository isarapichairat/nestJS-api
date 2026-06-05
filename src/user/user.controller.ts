import { Body, Controller, Get,  Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { User } from '@prisma/client';
import { Request } from 'express';
import { request } from 'http';
import { EditUserDto } from './dto';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { Patch } from '@nestjs/common';
import { userInfo } from 'os';
import { UserService } from './user.service';


interface AuthRequest extends Request {
        user?: any;
}
 
@UseGuards(JwtGuard) 
@Controller('users')
export class UserController {
        constructor(private userService: UserService){}
        @Get('me')
        getMe(@GetUser() user: User ) {
                //console.log({
                 //       user: req.user,
                //});
         
                return user;
        }

        @Patch()
        editUser(@GetUser('id') userId: number,
                 @Body() dto: EditUserDto,){
                        return this.userService.editUser(userId, dto)

        }
}
