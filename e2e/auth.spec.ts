import { test, expect } from '@playwright/test';

test.describe('Proces Logowania', () => {
    
  test('powinien wyświetlić błąd przy złym haśle', async ({ page }) => {
    await page.goto('/user/signin');

    await page.getByPlaceholder('jan@kowalski.pl').fill('test@example.com');
    await page.getByPlaceholder('••••••••').fill('zlehaslo123');
    
    await page.getByRole('button', { name: 'Zaloguj się' }).click();

    await expect(page.getByText('Błędny email lub hasło')).toBeVisible();
  });

});