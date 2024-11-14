import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import {
  ExpressAdapter,
  NestExpressApplication,
} from "@nestjs/platform-express";
import * as express from "express";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(express())
  );

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: "*",
  });

  await app.init();
}

bootstrap();

// Exportando a função que será utilizada pelo Vercel
export default async (req, res) => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  await app.init();
  return app.getHttpAdapter().getInstance()(req, res); // Aqui exportamos o handler correto para o Vercel
};
