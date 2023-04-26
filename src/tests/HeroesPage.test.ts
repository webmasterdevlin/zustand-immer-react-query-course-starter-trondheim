import { test, expect } from '@playwright/test';
import type { Route } from '@playwright/test';

const homePageUrl = 'http://localhost:5173/';
const heroesEndpoint = '**/api/heroes';

const firstNameSelector = 'First Name';
const lastNameSelector = 'Last Name';
const houseSelector = 'House';
const knownAsSelector = 'Known As';

test.beforeEach(async ({ page }) => {
  await page.route(heroesEndpoint, route => {
    route.fulfill({
      status: 200,
      body: JSON.stringify([
        {
          id: '7ggew732dw',
          firstName: 'Barry',
          lastName: 'Allen',
          house: 'DC',
          knownAs: 'Flash',
        },
        {
          id: '1ggew732dw',
          firstName: 'Scott',
          lastName: 'Summer',
          house: 'Marvel',
          knownAs: 'Cyclopes',
        },
      ]),
    });
  });
});

test('Should be able to send post request', async ({ page }) => {
  await page.goto(homePageUrl);
  await page.route(heroesEndpoint, async route => {
    route.fulfill({
      status: 200,
      body: JSON.stringify([]),
    });
  });

  await page.getByRole('button', { name: 'heroes' }).click();
  await page.getByLabel(firstNameSelector).click();
  await page.getByLabel(firstNameSelector).fill('Devlin');
  await page.getByLabel(firstNameSelector).press('Tab');
  await page.getByLabel(lastNameSelector).fill('Duldulao');
  await page.getByLabel(lastNameSelector).press('Tab');
  await page.getByLabel(houseSelector).fill('DC');
  await page.getByLabel(houseSelector).press('Tab');
  await page.getByLabel(knownAsSelector).fill('DarkStar Destroyer');

  await page.route(heroesEndpoint, route => {
    route.fulfill({
      status: 201,
      body: JSON.stringify({
        id: '3r8how',
        firstName: 'Devlin',
        lastName: 'Duldulao',
        house: 'DC',
        knownAs: 'DarkStar Destroyer',
      }),
    });
  });
  await page.getByRole('button', { name: 'Save Character' }).click();

  const newRow = page.getByText('Devlin Duldulao');
  await expect(newRow).toBeVisible();
});

test('Should get list of heroes', async ({ page }) => {
  await page.goto('/heroes');

  const row1 = page.getByText('Barry Allen');
  await expect(row1).toBeVisible();

  const row2 = page.getByText('Scott Summer');
  await expect(row2).toBeVisible();
});
