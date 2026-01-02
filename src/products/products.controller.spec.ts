/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  const mockProductsService = {
    create: jest.fn().mockResolvedValue({ id: '1' }),
    findAll: jest.fn().mockResolvedValue([{ id: '1' }]),
    findOne: jest.fn().mockResolvedValue({ id: '1' }),
    update: jest.fn().mockResolvedValue({ id: '1' }),
    remove: jest.fn().mockResolvedValue({ id: '1' }),
    handleOrderCreated: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [{ provide: ProductsService, useValue: mockProductsService }],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('devrait être défini', () => {
    expect(controller).toBeDefined();
  });

  it('create appelle le service', async () => {
    await controller.create({
      name: 'A',
      price: 10,
      stock: 1,
      description: 'B',
    });
    expect(service.create).toHaveBeenCalled();
  });

  it('findAll appelle le service', async () => {
    await controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
  });

  it('findOne appelle le service', async () => {
    await controller.findOne('1');
    expect(service.findOne).toHaveBeenCalledWith('1');
  });

  it('update appelle le service', async () => {
    await controller.update('1', {});
    expect(service.update).toHaveBeenCalled();
  });

  it('remove appelle le service', async () => {
    await controller.remove('1');
    expect(service.remove).toHaveBeenCalledWith('1');
  });

  it('handleOrderCreated appelle le service', async () => {
    await controller.handleOrderCreated({});
    expect(service.handleOrderCreated).toHaveBeenCalled();
  });
});
