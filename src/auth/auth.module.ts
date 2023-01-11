import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';
import { UsersModule } from 'src/users/users.module';
import { ConfigService } from '@nestjs/config';
import { JWT_SECRET } from './secret';

@Module({
  imports: [
    // JwtModule.register({
    //   secret: JWT_SECRET.ACCESS_SECRET,
    // }),
    // JwtModule.register({
    //   secret: JWT_SECRET.REFRESH_SECRET,
    // }),
    JwtModule,
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    ConfigService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
})
export class AuthModule {}
