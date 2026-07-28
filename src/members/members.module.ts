import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [MembersService,PrismaService],
  controllers: [MembersController]
})
export class MembersModule {}
