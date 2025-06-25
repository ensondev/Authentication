import { Controller, Get, Res } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService){};
    
    @Get('')
    async getAllUser(@Res() res){
        return this.usersService.getAllUser(res);
    }

}
