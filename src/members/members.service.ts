import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MembersService {
      constructor(private readonly prismaService: PrismaService) {}
    async getAll(){
        return await this.prismaService.gallery_images.findMany(
            
        )
    }
}
