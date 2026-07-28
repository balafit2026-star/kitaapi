import { Controller,Get } from '@nestjs/common';
import { MembersService } from './members.service';

@Controller('members')
export class MembersController {
      constructor(private readonly membersService: MembersService) {}
   @Get()
   getAll(){
return this.membersService.getAll();
   }
}
