import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './app/auth/auth.module';
import { TodoModule } from './app/todo.modules';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './app/guards/jwt-auth.guards';
import { AppService } from './app.service';

@Module({
  imports: [TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configServise: ConfigService) => ({
      type: 'mariadb',
      host: configServise.get('DB_HOST', 'localhost'),
      port: Number(configServise.get('DB_PORT', 3306)),
      username: configServise.get('DB_USERNAME', 'root'),
      password: configServise.get('DB_PASSWORD', '123'),
      database: configServise.get('DB_DATABASE', 'todo'),
      entities: [__dirname + '/**/*.entity{.js, .ts}'],
      synchronize: true,
    })
  }),
    TodoModule,
    AuthModule,
  ],

  controllers: [],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },],
})
export class AppModule { }
