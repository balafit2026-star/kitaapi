import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { GalleryImagesModule } from './gallery_images/gallery_images.module';
import { MembersModule } from './members/members.module';

@Module({
  imports: [PrismaModule, GalleryImagesModule, MembersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
