import { test, expect } from '@playwright/test';

test.describe('Proces Logowania', () => {
    
  test('powinien wyświetlić błąd przy złym haśle', async ({ page }) => {
    await page.goto('/user/signin');

    await page.getByLabel('Email').fill('test@example.com');
    await page.getByLabel('Hasło').fill('zlehaslo123');
    
    await page.getByRole('button', { name: 'Zaloguj się' }).click();

    await expect(page.getByText('Błąd logowania')).toBeVisible(); 
  });

});