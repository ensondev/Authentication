import { Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard, Public } from './guards/auth.guard';

@Public()
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){};

    @HttpCode(HttpStatus.OK)
    @Post('log-in')
    async logIng(@Req() req, @Res() res){
        return this.authService.login(req, res);
    }
    
    @HttpCode(HttpStatus.CREATED)
    @Post('sign-up')
    async createUser(@Req() req, @Res() res){
        return this.authService.createUser(req, res);
    }
}
