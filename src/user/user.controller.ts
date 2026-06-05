import { Controller, Get,  Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { User } from '@prisma/client';
import { Request } from 'express';
import { request } from 'http';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { Patch } from '@nestjs/common';


interface AuthRequest extends Request {
        user?: any;
}
 
@UseGuards(JwtGuard) 
@Controller('users')
export class UserController {
        @Get('me')
        getMe(@GetUser() user: User ) {
                //console.log({
                 //       user: req.user,
                //});
         
                return user;
        }

        @Patch()
        editUser(){

        }
}
