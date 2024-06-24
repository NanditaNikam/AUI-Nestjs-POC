import { configure as serverlessExpress } from '@vendia/serverless-express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// if lambda is already instantiated and we make subsequent calls, we make use of cachedServer rather then instantiating it again and again
let cachedServer; 

export const handler = async (event, context) => {
  if (!cachedServer) {
    //  this creates nestapp using appmodule which brings neccessary modules and once app is initialized it will be provide to serverlessExpress
    const nestApp = await NestFactory.create(AppModule);
    cachedServer = serverlessExpress({
      app: nestApp.getHttpAdapter().getInstance(),
    });
  }
  return cachedServer(event, context)
};
