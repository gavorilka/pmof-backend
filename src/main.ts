import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.APP_PORT || 5000;
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(process.env.API_PREFIX || 'api');
  await app.listen(port, () => console.log(`http://localhost:${port}`));
}
bootstrap().then(() => {
  // console.log(process.env);
});
