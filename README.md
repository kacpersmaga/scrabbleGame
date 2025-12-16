# Scrabble Online - Projekt Laboratoryjny

Aplikacja internetowa do gry w Scrabble, zrealizowana w ramach laboratoriów z Frontend Developmentu (Lab 6-11). Projekt wykorzystuje najnowsze technologie webowe do zapewnienia płynnej rozgrywki, autoryzacji użytkowników oraz zapisywania postępów w chmurze.

## 🚀 Wersja Live

Aplikacja jest wdrożona i dostępna pod adresem:
### [🔗 https://scrabble-game-nine.vercel.app/](https://scrabble-game-nine.vercel.app/)

---

## 🛠 Technologie

Projekt został zbudowany w oparciu o nowoczesny stos technologiczny:

* **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
* **Język:** [TypeScript](https://www.typescriptlang.org/)
* **Baza danych i Autoryzacja:** [Firebase](https://firebase.google.com/) (Authentication & Firestore)
* **Style:** [Tailwind CSS](https://tailwindcss.com/)
* **UI Library:** [Tailblocks](https://tailblocks.cc/) (Sekcja Hero, Footer, Formularze - zgodnie z wymogiem Lab 7)
* **Testy E2E:** [Playwright](https://playwright.dev/)
* **Hosting:** [Vercel](https://vercel.com/)

## ✨ Funkcjonalności

1.  **Rozgrywka Scrabble:**
    * Interaktywna plansza 15x15.
    * Losowanie liter, układanie słów, walidacja ruchów.
    * Przeliczanie punktów (premie słowne i literowe).
    * Zapisywanie stanu gry do chmury.

2.  **Konto Użytkownika (Firebase Auth):**
    * Rejestracja z weryfikacją email.
    * Logowanie (Email/Hasło).
    * Resetowanie hasła.
    * Ochrona tras (przekierowanie niezalogowanych użytkowników w `app/(protected)/layout.tsx`).

3.  **Panel Użytkownika (Firestore):**
    * **Profil:** Edycja nicku, zdjęcia profilowego oraz danych adresowych (Ulica, Miasto, Kod pocztowy).
    * **Historia Gier:** Przeglądanie zapisanych rozgrywek przypisanych do konkretnego użytkownika.

## 📦 Instalacja i Uruchomienie lokalne

Aby uruchomić projekt na własnym komputerze:

1.  **Sklonuj repozytorium:**
    ```bash
    git clone [https://github.com/TWOJ_LOGIN/lab6-scrabble.git](https://github.com/TWOJ_LOGIN/lab6-scrabble.git)
    cd lab6-scrabble
    ```

2.  **Zainstaluj zależności:**
    ```bash
    npm install
    ```

3.  **Skonfiguruj zmienne środowiskowe:**
    Utwórz plik `.env.local` w głównym katalogu i dodaj klucze ze swojego projektu Firebase.

4.  **Uruchom serwer deweloperski:**
    ```bash
    npm run dev
    ```

## 📝 Informacje o autorze

* **Student:** Kacper Smaga
* **Numer albumu:** 14997
* **Wybrana biblioteka UI (Lab 7):** Tailblocks (nr 7)
