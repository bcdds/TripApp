# Trip to Brazil — Google Sheets App (CSV)

This is a lightweight, pretty web app that **reads your Google Sheets** (published as CSV) and shows:

- **Summary** with totals in **SEK** (BRL in smaller text)
- **Per-person totals** (Bruno, Sebastian)
- **Itinerary** supporting multiple legs per day
- **Lodgings** and **Expenses** with BRL⇄SEK conversion and splits

## Quick start
1. Install Node.js 18+
2. In this folder:
   ```bash
   npm install
   npm run dev
   ```
3. The app opens at http://localhost:5173 and uses **sample CSV** in `public/sample`.

## Connect your Google Sheets
1. In your Sheet, go to **File → Share → Publish to web**.
2. For each tab (**Rates, Itinerary, Lodgings, Expenses**), choose **CSV** and copy the link.
3. Open `src/config.ts` and replace the sample URLs:
   ```ts
   export const CONFIG = {
     RATES_CSV: 'https://docs.google.com/spreadsheets/d/.../pub?output=csv',
     ITINERARY_CSV: '...',
     LODGINGS_CSV: '...',
     EXPENSES_CSV: '...',
   }
   ```

> Tip: If you prefer not to publish publicly, you can host the CSV behind a small proxy or use the Google Sheets API with a service account—ask me and I’ll switch the adapter.

## Data format (columns)
Match the columns from the provided template (or edit `src/types.ts`).

- `Rates`: `Pair` (`BRL->SEK`), `Rate`
- `Itinerary`: Date, Start Time, End Time, Leg Type, From, To, City, Country, Location/Place, Notes
- `Lodgings`: Property Name, City, Check-in, Check-out, Nights, Platform, Confirmation, Amount, Currency (SEK/BRL), Paid By, Split With
- `Expenses`: Date, Category, Description, City, Amount, Currency, Paid By, Split Type (Split/Personal), Split % Bruno, Split % Sebastian

## Currency + splits logic
- **SEK primary**, **BRL derived** via the `Rates` pair `BRL->SEK`.
- Lodgings: if `Split With` is `Both` → 50/50, else all to the payer.
- Expenses: if `Split Type` = `Split`, use percentages or default 50/50; otherwise all to the payer.

## Build for production
```
npm run build
npm run preview
```

## Styling
- TailwindCSS with light, clean cards.
- 🇧🇷 & 🇸🇪 accent tones (subtle).

If you want, I can generate a Glide version too; this one is code-first but keeps setup simple via CSV links.
