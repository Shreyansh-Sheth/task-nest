import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BookModule } from './book/book.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      autoLoadEntities: true,
      type: 'postgres',
      url: 'postgres://task_k5oo_user:EvVr5xzacjsodlp7uuQqcqYsNxMBjc4k@dpg-cevd3t02i3mntl1cds5g-a.oregon-postgres.render.com/task_k5oo',
      ssl: true,
      synchronize: true,

      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    }),
    UsersModule,
    AuthModule,
    BookModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
