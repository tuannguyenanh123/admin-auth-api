import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { comparePassword } from 'src/helpers/utils';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    const isPasswordValid = await comparePassword(pass, user.password);

    if (!user || !isPasswordValid) return null;
    return user;
  }

  // async signIn(email: string, pass: string): Promise<any> {
  //   const user = await this.usersService.findByEmail(email);
  //   if (!user) {
  //     throw new NotFoundException(`No user found for email with ${email}`);
  //   }

  //   const isPasswordValid = await comparePassword(pass, user.password);
  //   if (!isPasswordValid) {
  //     throw new UnauthorizedException('Invalid password / username');
  //   }

  //   const payload = { username: user.email, sub: user._id };
  //   return {
  //     accessToken: await this.jwtService.signAsync(payload),
  //   };
  // }

  async login(user: any) {
    const payload = { username: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
