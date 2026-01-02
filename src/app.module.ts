import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './auth/jwt.strategy';
import { PrismaService } from './prisma.service';
import { PrometheusModule } from '@willsoto/nestjs-prometheus/dist/module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ProductsModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    PrometheusModule.register(),
    ConfigModule.forRoot({ isGlobal: true }),
    ProductsModule,
  ],
  controllers: [],
  providers: [JwtStrategy, PrismaService],
})
export class AppModule {}
