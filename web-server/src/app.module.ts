import { CacheModule, Module } from '@nestjs/common';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { validate } from './env/env.validation';
import { AppSettingsController } from './app-settings/app-settings.controller';
import { HttpModule } from '@nestjs/axios';
import { TeamLogoController } from './team-logo/team-logo.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validate,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
  ],
  controllers: [
    AppSettingsController,
    TeamLogoController
  ],
  providers: [
  ],
})
export class AppModule { }
