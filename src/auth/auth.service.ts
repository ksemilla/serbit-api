import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { SignInDto } from './dto/sign-in.dto';
import * as bcrypt from 'bcrypt';
import { VerifyTokenDto } from './dto/verify.dto';
import { VerifyTokenResult } from 'src/interfaces';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto): Promise<{ accessToken: string }> {
    const user = await this.usersService.findOne({
      where: {
        email: signInDto.email,
      },
    });

    if (!user) throw new BadRequestException('No user found with that email');

    const isMatch = await bcrypt.compare(signInDto.password, user.password);
    if (!isMatch) throw new UnauthorizedException();

    const payload = { email: user.email, sub: user.id };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  async verifyToken(
    verifyTokenDto: VerifyTokenDto,
  ): Promise<VerifyTokenResult> {
    try {
      const payload = await this.jwtService.verifyAsync<VerifyTokenResult>(
        verifyTokenDto.accessToken,
      );
      return payload;
    } catch (e) {
      switch (e.name) {
        case 'JsonWebTokenError':
          throw new UnauthorizedException('Invalid token');
        case 'TokenExpiredError':
          throw new UnauthorizedException('Token has expired');
        default:
          throw new UnauthorizedException('Unauthorized');
      }
    }
  }
}
