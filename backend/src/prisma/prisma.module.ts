import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserModule } from '../user/user.module';

@Global() // どのモジュールからでも使えるように Global にする
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
  imports: [UserModule],
})
export class PrismaModule {}
