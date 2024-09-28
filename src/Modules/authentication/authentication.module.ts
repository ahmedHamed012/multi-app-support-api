import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from 'src/Core/Services/auth.service';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '90d' },
    }),
  ],
  controllers: [AuthenticationController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthenticationModule {}
