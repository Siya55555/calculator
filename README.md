# Badbygg VVS - Price Calculator Widget

A multi-step questionnaire and price calculator widget for Badbygg VVS, designed to be embedded on your website and Facebook page.

## Features

- **Multi-step questionnaire** with progress indicator
- **Project type selection** with visual cards
- **Contact information collection** (required before showing price)
- **Price calculation** based on project type and area
- **Responsive design** for mobile and desktop
- **Easy customization** of prices and styling
- **Embeddable** for websites and Facebook pages

## Quick Start

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Customization

#### 1. Pricing Configuration

Edit `src/config/pricing.ts` to adjust prices:

```typescript
export const PRICING_CONFIG: PricingConfig = {
  basePrices: {
    totalrenovering: 2500,  // kr per m² for total renovation
    delrenovering: 1800,     // kr per m² for partial renovation
    nybygg: 3500,           // kr per m² for new construction
    påbygg: 2800,           // kr per m² for extension
    loft: 2000,             // kr per m² for attic/basement
    bad: 1500,              // kr per m² for bathroom
    garasje: 2200,          // kr per m² for garage
    annet: 2000             // kr per m² for other projects
  },
  areaMultiplier: 1,        // multiplier for area calculation
  currency: 'kr',
  currencyFormat: 'no-NO'
};
```

#### 2. Branding and Colors

Update the styling in `src/App.tsx` and `src/components/Questionnaire.tsx`:

- **Logo and company name**: Edit the Header component in `App.tsx`
- **Colors**: Modify the styled-components in both files
- **Fonts**: Update the font-family properties

#### 3. Project Types

Edit the `PROJECT_TYPES` array in `src/components/Questionnaire.tsx`:

```typescript
const PROJECT_TYPES: ProjectType[] = [
  { id: 'totalrenovering', name: 'Totalrenovering', description: 'Full renovation of your property' },
  // Add or modify project types here
];
```

## Embedding

### For Your Website

1. Build the project: `npm run build`
2. Copy the `dist` folder contents to your web server
3. Embed using an iframe:

```html
<iframe 
  src="https://your-domain.com/calculator-widget/" 
  width="100%" 
  height="800px" 
  frameborder="0"
  style="border: none; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
</iframe>
```

### For Facebook Page

1. Host the widget on a secure HTTPS server
2. Create a Facebook Page Tab App (requires Facebook App ID)
3. Set the Page Tab URL to your hosted widget
4. The widget will be displayed in a 810px width container

## File Structure

```
src/
├── components/
│   └── Questionnaire.tsx    # Main questionnaire component
├── config/
│   └── pricing.ts          # Pricing configuration
├── App.tsx                 # Main app component
└── main.tsx               # Entry point
```

## Technology Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Styled Components** for styling
- **Responsive design** for all devices

## Customization Guide

### Adding New Project Types

1. Add to `PROJECT_TYPES` array in `Questionnaire.tsx`
2. Add pricing in `pricing.ts`
3. Update the `getProjectTypeName` function

### Modifying the Form Flow

1. Edit the step rendering functions in `Questionnaire.tsx`
2. Update the `totalSteps` constant
3. Modify validation logic in `canProceed()`

### Styling Changes

1. Update styled-components in both files
2. Modify colors, fonts, and spacing
3. Test on different screen sizes

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Adding Features

- **Email integration**: Add email service in a backend
- **Lead storage**: Implement database storage
- **Analytics**: Add Google Analytics or similar
- **A/B testing**: Create multiple questionnaire versions

## Support

For questions or customization help, contact your development team.

## License

This project is proprietary to Badbygg VVS.
