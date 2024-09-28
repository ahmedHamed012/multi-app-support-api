import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ErrorExceptionsFilter } from './Shared/Errors/errors.exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new ErrorExceptionsFilter());
  const PORT = process.env.PORT || 3000;
  await app.listen(PORT, () => {
    console.log(`Application is running on: ${PORT}`);
  });
}
bootstrap();
