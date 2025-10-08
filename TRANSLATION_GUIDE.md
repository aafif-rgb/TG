# Translation and RTL Support Implementation Guide

This guide explains how the Arabic language support and RTL (Right-to-Left) functionality has been implemented in your React website.

## Overview

The website now supports both English and Arabic languages with full RTL layout support. The implementation uses:

- **react-i18next**: Industry-standard i18n library for React
- **React Context API**: For managing language state across the app
- **CSS RTL Support**: Automatic layout flipping for Arabic

## Features Implemented

✅ Language toggle button in header (desktop & mobile)
✅ Complete translation system with English and Arabic
✅ RTL layout that automatically adjusts when Arabic is selected
✅ Context-based state management (no localStorage)
✅ All text content translated across the entire website
✅ Proper CSS adjustments for RTL layout

## Project Structure

```
src/
├── i18n/
│   ├── config.js              # i18next configuration
│   └── locales/
│       ├── en.json            # English translations
│       └── ar.json            # Arabic translations
├── contexts/
│   └── LanguageContext.jsx    # Language state management
├── styles/
│   └── rtl.css                # RTL-specific CSS styles
└── components/
    └── Header/
        ├── Header.jsx         # Includes language toggle button
        └── Header.css         # Styled language toggle
```

## How It Works

### 1. Language Context (`src/contexts/LanguageContext.jsx`)

The `LanguageProvider` wraps the entire app and provides:

- Current language state (`en` or `ar`)
- Text direction (`ltr` or `rtl`)
- Functions to toggle or change language

```jsx
import { useLanguage } from "./contexts/LanguageContext";

function MyComponent() {
  const { language, direction, isRTL, toggleLanguage } = useLanguage();

  return (
    <div>
      Current language: {language}
      <button onClick={toggleLanguage}>Switch Language</button>
    </div>
  );
}
```

### 2. Using Translations in Components

Import the `useTranslation` hook from `react-i18next`:

```jsx
import { useTranslation } from "react-i18next";

function MyComponent() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("nav.home")}</h1>
      <p>{t("hero.subtitle")}</p>
    </div>
  );
}
```

### 3. Translation Files

All translations are stored in JSON files:

**English** (`src/i18n/locales/en.json`):

```json
{
  "nav": {
    "home": "Home",
    "about": "About",
    "services": "Services"
  }
}
```

**Arabic** (`src/i18n/locales/ar.json`):

```json
{
  "nav": {
    "home": "الرئيسية",
    "about": "من نحن",
    "services": "خدماتنا"
  }
}
```

### 4. RTL Layout

When Arabic is selected, the following happens automatically:

1. `dir="rtl"` attribute is applied to `<html>`
2. RTL-specific CSS rules take effect
3. Layout elements flip horizontally
4. Text alignment switches to right

The RTL CSS is imported globally in `src/index.css`.

## Language Toggle Button

The language toggle appears in two places:

### Desktop Navigation

- Located in the header next to navigation items
- Shows "AR" when English is active
- Shows "EN" when Arabic is active
- Styled with brand colors

### Mobile Menu

- Appears at the bottom of mobile navigation
- Shows "العربية" when English is active
- Shows "English" when Arabic is active

## Adding New Translations

To add new text that needs translation:

1. **Add to translation files**:

   ```json
   // en.json
   {
     "mySection": {
       "title": "My Title",
       "description": "My Description"
     }
   }

   // ar.json
   {
     "mySection": {
       "title": "عنواني",
       "description": "وصفي"
     }
   }
   ```

2. **Use in component**:

   ```jsx
   const { t } = useTranslation();

   return (
     <div>
       <h2>{t("mySection.title")}</h2>
       <p>{t("mySection.description")}</p>
     </div>
   );
   ```

## RTL CSS Considerations

The RTL stylesheet (`src/styles/rtl.css`) handles:

- **Flexbox reversals**: `flex-direction: row-reverse`
- **Text alignment**: Switches to right-aligned
- **Margins/Padding**: Automatically flipped
- **Border positions**: Left borders become right borders
- **Icons**: Proper spacing adjustments
- **Animations**: Direction-aware transforms

### Example RTL Rule

```css
[dir="rtl"] .header-container {
  flex-direction: row-reverse;
}

[dir="rtl"] .mobile-nav-link {
  text-align: right;
  border-left: none;
  border-right: 3px solid transparent;
}
```

## Testing

To test the implementation:

1. **Start the development server**:

   ```bash
   npm run dev
   ```

2. **Toggle language**: Click the language button in the header

3. **Verify**:
   - All text changes to Arabic
   - Layout flips to RTL
   - Navigation works correctly
   - Forms display properly
   - Mobile menu functions correctly

## Components Updated

All major components now support translations:

- ✅ Header (with language toggle)
- ✅ HomePage (hero, stats, approach)
- ✅ Footer (all sections)
- ✅ Services component
- ✅ Values component
- ✅ ContactPage (form, labels, messages)

## Customization

### Change Default Language

Edit `src/i18n/config.js`:

```javascript
i18n.init({
  lng: "ar", // Change to 'ar' for Arabic default
  // ...
});
```

### Add More Languages

1. Create new translation file (e.g., `fr.json`)
2. Add to i18n config:
   ```javascript
   resources: {
     en: { translation: enTranslations },
     ar: { translation: arTranslations },
     fr: { translation: frTranslations }
   }
   ```
3. Update language toggle logic

## Browser Support

The implementation works in all modern browsers that support:

- CSS Flexbox
- CSS Grid
- CSS custom properties
- ES6+ JavaScript

## Performance

- Translations are loaded upfront (no lazy loading needed for this size)
- Language changes happen instantly
- No localStorage means no hydration issues
- RTL CSS is minimal and optimized

## Troubleshooting

### Text not translating

- Check that the translation key exists in both `en.json` and `ar.json`
- Verify `useTranslation()` hook is imported and used
- Ensure component is wrapped in `LanguageProvider`

### Layout not flipping

- Check that `rtl.css` is imported in `index.css`
- Verify the HTML `dir` attribute changes when toggling language
- Inspect browser DevTools to see if RTL CSS rules are applied

### Language not persisting

- This is expected! The implementation doesn't use localStorage as requested
- Language resets to default (English) on page refresh
- To persist, you would need to add localStorage or cookies

## Future Enhancements

Possible improvements:

- Add more languages (French, Spanish, etc.)
- Implement language persistence with localStorage (optional)
- Add language auto-detection based on browser settings
- Lazy load translations for better performance with many languages
- Add animation when switching languages

## Support

For any issues or questions about the translation system, refer to:

- [react-i18next documentation](https://react.i18next.com/)
- [RTL Styling Guide](https://rtlstyling.com/)

---

**Note**: The language preference does NOT persist across page refreshes as per your requirements. If you want to add persistence later, you can easily integrate localStorage or cookies with the existing context.
