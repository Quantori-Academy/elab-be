describe('CreateOrderDto', () => {
  it('should create a valid CreateOrderDto', () => {
    const createOrderDtoMock = {
      title: 'Order for reagents',
      seller: 'Oriflame',
      reagents: [{ id: 1 }, { id: 2 }, { id: 3 }],
      status: 'Pending',
    };

    expect(createOrderDtoMock).toHaveProperty('title');
    expect(createOrderDtoMock.title).toBe('Order for reagents');
    expect(createOrderDtoMock).toHaveProperty('seller');
    expect(createOrderDtoMock.seller).toBe('Oriflame');
    expect(createOrderDtoMock).toHaveProperty('reagents');
    expect(createOrderDtoMock.reagents).toHaveLength(3);
  });
});

describe('CreateOrderSuccessDto', () => {
  it('should match CreateOrderSuccessDto structure', () => {
    const createOrderSuccessDtoMock = {
      id: 1,
      userId: 2,
      title: 'Order for reagents',
      seller: 'Oriflame',
      status: 'Pending',
      createdAt: new Date('2024-10-29T11:19:04.248Z'),
      updatedAt: new Date('2024-10-29T11:19:04.248Z'),
      reagents: [
        {
          id: 1,
          userId: 1,
          name: 'Reagent A',
          structureSmiles: 'CO',
          casNumber: '123-45-67',
          desiredQuantity: 12.1,
          quantityUnit: '121212',
          userComments: 'Commenting here...',
          procurementComments: null,
          status: 'Pending',
          createdAt: new Date('2024-10-29T10:56:20.529Z'),
          updatedAt: new Date('2024-10-29T11:19:04.248Z'),
          orderId: 12,
        },
      ],
    };

    expect(createOrderSuccessDtoMock).toHaveProperty('id');
    expect(createOrderSuccessDtoMock.id).toBe(1);
    expect(createOrderSuccessDtoMock).toHaveProperty('userId');
    expect(createOrderSuccessDtoMock.userId).toBe(2);
    expect(createOrderSuccessDtoMock.reagents).toHaveLength(1);
  });
});

describe('CreateOrderBadRequestDto', () => {
  it('should match CreateOrderBadRequestDto structure', () => {
    const createOrderBadRequestDtoMock = {
      message: [
        'title must be shorter than or equal to 200 characters',
        'seller must be shorter than or equal to 200 characters',
        'reagents must be an array',
      ],
      error: 'Bad Request',
      statusCode: 400,
    };

    expect(createOrderBadRequestDtoMock).toHaveProperty('error');
    expect(createOrderBadRequestDtoMock.error).toBe('Bad Request');
    expect(createOrderBadRequestDtoMock.message).toHaveLength(3);
  });
});

describe('CreateOrderConflictErrorDto', () => {
  it('should match CreateOrderConflictErrorDto structure', () => {
    const createOrderConflictErrorDtoMock = {
      message: [
        'Order with id 48 includes reagentRequests with ids - 2 which has status Ordered',
        'Order with id 51 includes reagentRequests with ids - 1 which has status Ordered',
      ],
      error: 'Conflict',
      statusCode: 409,
    };

    expect(createOrderConflictErrorDtoMock).toHaveProperty('error');
    expect(createOrderConflictErrorDtoMock.error).toBe('Conflict');
    expect(createOrderConflictErrorDtoMock.message).toHaveLength(2);
  });
});

describe('CreateOrderNotFoundDto', () => {
  it('should match CreateOrderNotFoundDto structure', () => {
    const createOrderNotFoundDtoMock = {
      message: "The following reagent with ID's not found: 1, 2, 3",
      error: 'Not Found',
      statusCode: 404,
    };

    expect(createOrderNotFoundDtoMock).toHaveProperty('error');
    expect(createOrderNotFoundDtoMock.error).toBe('Not Found');
    expect(createOrderNotFoundDtoMock.message).toBe("The following reagent with ID's not found: 1, 2, 3");
  });
});

describe('UpdateOrderDto', () => {
  it('should update order information', () => {
    const updateOrderDtoMock = {
      title: 'Updated Order Title',
      seller: 'Updated Seller',
      status: 'Fulfilled',
      includeReagents: [{ id: 2 }],
      excludeReagents: [{ id: 1 }],
    };

    expect(updateOrderDtoMock).toHaveProperty('title');
    expect(updateOrderDtoMock.title).toBe('Updated Order Title');
    expect(updateOrderDtoMock).toHaveProperty('seller');
    expect(updateOrderDtoMock.seller).toBe('Updated Seller');
    expect(updateOrderDtoMock).toHaveProperty('status');
    expect(updateOrderDtoMock.status).toBe('Fulfilled');
  });
});

describe('UpdateOrderSuccessDto', () => {
  it('should match UpdateOrderSuccessDto structure', () => {
    const updateOrderSuccessDtoMock = {
      id: 5,
      userId: 3,
      title: 'Updated Order Title',
      seller: 'Updated Seller',
      status: 'Fulfilled',
      createdAt: new Date('2024-10-29T11:19:04.248Z'),
      updatedAt: new Date('2024-10-29T11:19:04.248Z'),
      reagents: [
        {
          id: 2,
          userId: 1,
          name: 'Reagent B',
          structureSmiles: 'CC',
          casNumber: '234-56-78',
          desiredQuantity: 10.5,
          quantityUnit: 'mg',
          userComments: 'Updated comment',
          procurementComments: null,
          status: 'Fulfilled',
          createdAt: new Date('2024-10-29T10:56:20.529Z'),
          updatedAt: new Date('2024-10-29T11:19:04.248Z'),
          orderId: 5,
        },
      ],
    };

    expect(updateOrderSuccessDtoMock).toHaveProperty('id');
    expect(updateOrderSuccessDtoMock.id).toBe(5);
    expect(updateOrderSuccessDtoMock.reagents).toHaveLength(1);
  });
});
