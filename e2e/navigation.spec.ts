import { test, expect } from '@playwright/test';

test.describe('Nawigacja i Ochrona tras', () => {

  test('powinien przekierować niezalogowanego użytkownika z dashboardu do logowania', async ({ page }) => {
    await page.goto('/dashboard');
    
    await expect(page).toHaveURL(/\/user\/signin\?returnUrl=.*/);
    
    await expect(page.getByRole('heading', { name: 'Zaloguj się' })).toBeVisible();
  });

  test('strona główna powinna mieć linki do logowania', async ({ page }) => {
    await page.goto('/');
    
    const loginLink = page.getByRole('link', { name: /Zaloguj|Mam już konto/i }).first(); 
    
    await expect(loginLink).toBeVisible();
    await expect(loginLink).toHaveAttribute('href', '/user/signin');
  });

});