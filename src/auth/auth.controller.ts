import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './passport/local-auth.guard';
import { Public } from 'src/decorator/auth';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly mailerService: MailerService,
  ) {}

  // @Post('login')
  // create(@Body() createAuthDto: CreateAuthDto) {
  //   return this.authService.signIn(
  //     createAuthDto.username,
  //     createAuthDto.password,
  //   );
  // }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  handleLogin(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Public()
  @Post('register')
  handleRegister(@Body() registerDto: CreateUserDto) {
    return this.authService.register(registerDto);
  }

  @Public()
  @Get('mail')
  sendMail() {
    this.mailerService
      .sendMail({
        to: 'tuanan.devcandy@gmail.com',
        from: 'noreply@nestjs.com', // sender address
        subject: 'Testing Nest MailerModule ✔', // Subject line
        text: 'welcome', // plaintext body,
        template: 'register',
        context: {
          name: 'tuan',
          activationCode: 'req.user.codeId',
        },
      })
      .then(() => {})
      .catch(() => {});
    return 'this.authService.register(registerDto);';
  }
}
