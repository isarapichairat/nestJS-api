import { Controller, Post, Req , Body, ParseIntPipe, HttpCode, HttpStatus } from "@nestjs/common";
import { AuthService } from "./auth.service";
import type { Request } from "express";
import { AuthDto  } from "./dto";


@Controller('auth')
export class AuthController {
        constructor(private authService: AuthService) {}

        

        @Post('signup')
        async signup(@Body() dto: AuthDto) {
                console.log({
                        dto,
                });
                return this.authService.signup(dto);
        }
        @HttpCode(HttpStatus.OK)

        @Post('signin')
        async signin(@Body() dto: AuthDto) {
                return this.authService.signin(dto);
        }
}

