import { rest } from 'msw';

const baseUrl = '**/api';

export const Heroes = [
  {
    id: '32urhuewf',
    firstName: 'Barry',
    lastName: 'Allen',
    house: 'DC',
    knownAs: 'Flash',
  },
  {
    id: '89giugh',
    firstName: 'Scott',
    lastName: 'Summer',
    house: 'Marvel',
    knownAs: 'Cyclopes',
  },
];

export const heroHandler = [
  rest.get(`${baseUrl}/heroes`, (req, res, ctx) => {
    return res(ctx.json(Heroes));
  }),
];
