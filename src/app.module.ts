import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './auth/jwt.strategy';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    ProductsModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [],
  providers: [JwtStrategy, PrismaService],
})
export class AppModule {}
