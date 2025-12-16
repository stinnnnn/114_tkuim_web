# Week 14 Project: Modern Fintech Dashboard & Landing Suite

## 🎯 Project Objective
Build a high-performance, aesthetically premium web application that combines a **personal portfolio/landing page** (Reference: Image 1 & 3) with a fully functional **Crypto/Asset Dashboard** (Reference: Image 2).

## 🎨 Design Language
- **Theme**: Dominant Dark Mode (Deep Navy/Black) with vibrant Neon Accents (Blue/Teal).
- **Typography**: Monospace for data/labels (SF Mono/Fira Code) + Sans-serif for headers (Inter/Roboto).
- **Visuals**:
  - Glassmorphism effects for cards.
  - Smooth micro-interactions and glowing borders.
  - Minimalist layout with plenty of breathing room.

## 🛠 Tech Stack
- **Core**: React (Vite)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React / Heroicons
- **Charts**: Recharts or Chart.js
- **Animation**: Framer Motion

## 📅 Development Roadmap

### Phase 1: Project Initialization 🚀
- [ ] Initialize project with Vite + React.
- [ ] Install dependencies: `tailwindcss`, `framer-motion`, `recharts`, `lucide-react`, `react-router-dom`.
- [ ] Configure `tailwind.config.js`:
  - Add custom colors (`#0a192f` for background, neon green `#64ffda`, neon blue `#00a8ff`).
  - Configure fonts (Inter & Fira Code).

### Phase 2: Core Components & Layouts 🧩
- [ ] **App Shell / Layout**:
  - Create `Sidebar` component (collapsible, icons for Market, Portfolio, Settings).
  - Create `TopBar` (Search input, User profile).
- [ ] **UI Kit**:
  - `Card` (Glassmorphism container).
  - `Button` (Neon glow variants).
  - `Badge/Status` (Up/Down indicators).

### Phase 3: The Dashboard (Functional Core) 📊
*Reference: Image 2 (CryptoTrade)*
- [ ] **Market Overview**:
  - Implement Line Chart for price history (Recharts).
  - Create "Ticker Cards" (Market Cap, Volume, Supply).
- [ ] **Trading Interface**:
  - Build "Buy/Sell" widget.
  - Token selector dropdown.
- [ ] **Assets List**:
  - Table/List view for cryptocurrencies (Bitcoin, Ethereum, etc.).
- [ ] **Animations**:
  - Add entry animations for cards.
  - Hover effects on rows.

### Phase 4: The Landing Page (Marketing) 📢
*Reference: Image 1 (Brittany Chiang) & Image 3 (Uber)*
- [ ] **Hero Section**:
  - Large distinctive typography ("Building the future of finance").
  - Subtle animated background.
- [ ] **Features Section**:
  - Alternate layout (Text + Product Screenshot).
  - "Get Started" Booking/Signup Form (Reference Uber's clean input fields).
- [ ] **Footer**:
  - Minimalist links and social icons.

### Phase 5: Polish & Deployment ✨
- [ ] **Responsive Check**: Ensure Sidebar toggles on mobile.
- [ ] **SEO**: Add meta tags and titles.
- [ ] **Performance**: Optimize image loading.

---

## 📂 Suggested File Structure

```
Week 14/
├── public/
├── src/
│   ├── assets/            # Images & Global Styles
│   ├── components/
│   │   ├── common/        # Button, Card, Input
│   │   ├── dashboard/     # Chart, TradeWidget, Sidebar
│   │   └── landing/       # Hero, Features, properties
│   ├── layouts/
│   │   ├── DashboardLayout.jsx
│   │   └── MainLayout.jsx
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Landing.jsx
│   │   ├── Wallet.jsx
│   │   └── Settings.jsx
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── tailwind.config.js
└── package.json