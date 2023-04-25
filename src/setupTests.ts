import '@testing-library/dom';
import matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

beforeAll(() => {
  console.log('beforeAll');
});

afterEach(() => {
  console.log('afterEach');
});

afterAll(() => {
  console.log('afterAll');
});
