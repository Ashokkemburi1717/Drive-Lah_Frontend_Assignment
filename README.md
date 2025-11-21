# Drive Lah Frontend Assignment

This project is a responsive web application implementing the "Device Management" and "Subscription Plan" flows for Drive Lah, based on Adobe XD designs. It demonstrates responsive UI, state management with persistence, and modern React patterns.

## Project Overview

- **Goal**: Implement responsive Device Management and Subscription interfaces.
- **Features**:
  - **Responsive Navigation**: Sidebar for desktop, Dropdown for mobile.
  - **Device Management**: Form with inputs, toggle, and image upload. Supports multiple devices (Default: 4 devices).
  - **Subscription Plan**: Plan selection with feature comparison and payment method selection.
  - **Frozen State**: Includes a warning message for active listings preventing direct subscription changes.
  - **Data Persistence**: All state (devices, selected plan, current step) is persisted to `localStorage`.

## Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite 7.0.0
- **Styling**: Tailwind CSS 3.4.17
- **State Management**: Zustand (with `persist` middleware)
- **Icons**: Lucide React

## Project Structure

```
src/
├── components/
│   └── drivelah/
│       ├── Header.tsx            # Responsive header
│       ├── Sidebar.tsx           # Desktop sidebar navigation
│       ├── DeviceForm.tsx        # Device management form
│       └── SubscriptionForm.tsx  # Subscription plan selection with payments
├── store/
│   └── driveLahStore.ts          # Zustand store with persistence
├── pages/
│   └── DriveLahPage.tsx          # Main layout assembly
├── App.tsx                       # Application entry
└── main.tsx                      # React entry point
```

## Development Guide

### Commands

- **Install dependencies**: `npm install`
- **Start dev server**: `npm run dev`
- **Build for production**: `npm run build`

### Key Implementation Details

- **State Persistence**: The application uses `zustand/middleware/persist` to automatically save the `devices` array, `selectedPlan`, and `currentStep` to `localStorage` under the key `drivelah-storage`.
- **Responsive Design**:
  - Uses Tailwind's `md:` prefix to switch layouts.
  - Mobile view uses a dropdown for navigation instead of the sidebar.
  - Form layout switches from 1 column (mobile) to 2 columns (desktop).
- **Navigation**: Users can switch between "Subscription" and "Device" steps using the sidebar (desktop) or dropdown (mobile).
- **Payment Methods**: Integrated into the Subscription form to allow users to select or add payment methods.
- **Default Devices**: The store initializes with 4 default devices (Primary GPS, Secondary GPS, Drive Mate GPS, Lock Box).

## Deployment

The project is configured for Vite production builds.
Run `npm run build` to generate the `dist/` directory.
