/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { PrismaService } from '../prisma.service';

describe('ProductsService', () => {
  let service: ProductsService;
  let prisma: PrismaService;

  const mockPrismaService = {
    product: {
      findMany: jest.fn().mockResolvedValue([{ id: 'p1', name: 'Prod 1' }]),
      findUnique: jest.fn().mockResolvedValue({ id: 'p1', name: 'Prod 1' }),
      create: jest.fn().mockReturnValue({ id: 'p1', name: 'New Prod' }),
      update: jest.fn().mockResolvedValue({ id: 'p1', name: 'Updated Prod' }),
      delete: jest.fn().mockResolvedValue({ id: 'p1' }),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('devrait être défini', () => {
    expect(service).toBeDefined();
  });

  // --- RABBITMQ ---
  describe('handleOrderCreated', () => {
    it('devrait décrémenter le stock', async () => {
      const orderEvent = { items: [{ productId: 'p1', quantity: 1 }] };
      await service.handleOrderCreated(orderEvent);
      expect(prisma.product.update).toHaveBeenCalled();
    });
  });

  // --- CRUD Classique ---
  describe('create', () => {
    it('devrait créer un produit', async () => {
      await service.create({
        name: 'Test',
        price: 10,
        description: 'desc',
        stock: 10,
      });
      expect(prisma.product.create).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('devrait retourner des produits', async () => {
      await service.findAll();
      expect(prisma.product.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('devrait retourner un produit', async () => {
      await service.findOne('p1');
      expect(prisma.product.findUnique).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('devrait mettre à jour un produit', async () => {
      await service.update('p1', { name: 'Update' });
      expect(prisma.product.update).toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('devrait supprimer un produit', async () => {
      await service.remove('p1');
      expect(prisma.product.delete).toHaveBeenCalled();
    });
  });
});
