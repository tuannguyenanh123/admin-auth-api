import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './common/exceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // tránh truyền thừa thông tin không cần thiết gây crash app
      forbidNonWhitelisted: true, // throw error khi có dữ liệu không cần thiết truyền vào
    }),
  );
  app.setGlobalPrefix('api/v1');
  app.useGlobalFilters(new AllExceptionsFilter());
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  await app.listen(port);
}
bootstrap();
