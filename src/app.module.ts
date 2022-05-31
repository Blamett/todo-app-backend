import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './app/auth/auth.module';
import { JwtAuthGuard } from './app/guards/jwt-auth.guards';
import { TodoModule } from './app/todo/todo.modules';
import { UserModule } from './app/user/user.module';
import { PasswordRecoveryModule } from './app/pass-recovery/password-recovery.module';
import { ChangePasswordModule } from './app/change-password/change-password.module';

@Module({
  imports: [TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configServise: ConfigService) => ({
      type: 'mariadb',
      host: configServise.get('DB_HOST'),
      port: Number(configServise.get('DB_PORT')),
      username: configServise.get('DB_USERNAME'),
      password: configServise.get('DB_PASSWORD'),
      database: configServise.get('DB_DATABASE'),
      entities: [__dirname + '/**/*.entity{.js, .ts}'],
      synchronize: true,
    })
  }),
    UserModule,
    TodoModule,
    AuthModule,
    PasswordRecoveryModule,
    ChangePasswordModule,
  ],

  controllers: [],
  providers: [{
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  }]
})
export class AppModule { }
