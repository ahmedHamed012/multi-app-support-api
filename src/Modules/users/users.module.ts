import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from '../../Core/Services/users.service';
import { usersProviders } from 'src/Core/Providers/users.provider';
import { DatabaseModule } from 'src/Database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [...usersProviders, UsersService],
})
export class UsersModule {}
