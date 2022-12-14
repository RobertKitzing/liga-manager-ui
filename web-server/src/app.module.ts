import { Module } from '@nestjs/common';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { validate } from './env/env.validation';
import { AppSettingsController } from './app-settings/app-settings.controller';
import { WeblateController } from './weblate/weblate.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validate,
    }),
    HttpModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
  ],
  controllers: [AppSettingsController, WeblateController],
  providers: [],
})
export class AppModule {}
