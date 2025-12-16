import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Wskazujemy folder z testami (masz folder 'e2e' czy 'tests'? Dostosuj jeśli trzeba)
  testDir: './e2e', 
  
  // Uruchamiaj testy równolegle
  fullyParallel: true,
  
  // W przypadku błędu w CI nie uruchamiaj reszty
  forbidOnly: !!process.env.CI,
  
  // Liczba powtórzeń w przypadku błędu (przydatne przy niestabilnych testach)
  retries: process.env.CI ? 2 : 0,
  
  // Liczba wątków (na CI mniej, lokalnie wszystkie)
  workers: process.env.CI ? 1 : undefined,
  
  // Raport w HTML
  reporter: 'html',

  // === TUTAJ JEST ROZWIĄZANIE TWOJEGO BŁĘDU ===
  use: {
    // 1. Ustawiamy adres bazowy. Dzięki temu page.goto('/') wie, że chodzi o localhost:3000/
    baseURL: 'http://127.0.0.1:3000',

    // Zbieraj ślady (trace) przy pierwszym błędzie - super do debugowania
    trace: 'on-first-retry',
  },

  // === AUTOMATYCZNE URUCHAMIANIE NEXT.JS ===
  // Dzięki temu nie musisz ręcznie wpisywać 'npm run dev' w innym oknie
  webServer: {
    command: 'npm run dev',
    url: 'http://127.0.0.1:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000, // Czekaj do 2 minut na start aplikacji
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // Możesz odkomentować inne przeglądarki jeśli chcesz
    /*
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    */
  ],
});