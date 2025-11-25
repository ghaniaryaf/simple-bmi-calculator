# BMI Calculator

A modern, responsive BMI (Body Mass Index) calculator built with React and TypeScript. Features a beautiful UI with real-time calculations and support for both metric and imperial units.

![BMI Calculator](https://via.placeholder.com/600x400/3b82f6/ffffff?text=BMI+Calculator)

## ✨ Features

- **Dual Unit Support**: Switch between metric (kg, cm) and imperial (lbs, inches) units
- **Modern UI**: Clean, responsive design with smooth animations
- **Real-time Results**: Instant BMI calculation with visual feedback
- **Color-coded Categories**: Visual indicators for different BMI ranges
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **TypeScript**: Fully typed for better development experience
- **Accessible**: Proper ARIA labels and keyboard navigation

## 🚀 Quick Start

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/bmi-calculator.git
   cd bmi-calculator
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🛠️ Usage

### Basic Usage

```jsx
import BMICalculator from './components/BMICalculator';

function App() {
  return (
    <div className="App">
      <BMICalculator />
    </div>
  );
}
```

### As a Standalone Component

The BMI calculator can be easily integrated into any React project:

```jsx
function HealthApp() {
  return (
    <div>
      <h1>Health Dashboard</h1>
      <BMICalculator />
      {/* Other health components */}
    </div>
  );
}
```

## 📊 BMI Categories

| Category | BMI Range | Color Indicator |
|----------|-----------|-----------------|
| Underweight | < 18.5 | Blue |
| Normal weight | 18.5 - 24.9 | Green |
| Overweight | 25 - 29.9 | Orange |
| Obese | ≥ 30 | Red |

## 🎨 Customization

### Styling

The component uses inline styles but can be easily customized:

```jsx
// Custom color scheme
const customStyles = {
  primaryColor: '#8B5CF6',
  secondaryColor: '#A78BFA',
  // ... add more custom styles
};

<BMICalculator customStyles={customStyles} />
```

### Props

The component currently accepts the following props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `initialUnit` | `'metric' \| 'imperial'` | `'metric'` | Default unit system |
| `showDisclaimer` | `boolean` | `true` | Show health disclaimer |
| `className` | `string` | `''` | Additional CSS class |

## 🧮 Calculation Methods

### Metric System
```
BMI = weight (kg) / (height (m)²)
```

### Imperial System
```
BMI = (weight (lbs) / (height (inches)²)) × 703
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🏗️ Project Structure

```
bmi-calculator/
├── components/
│   └── BMICalculator.tsx
├── styles/
│   └── globals.css
├── public/
│   └── favicon.ico
├── package.json
├── tsconfig.json
└── README.md
```

## 🚀 Deployment

### Vercel (Recommended)

```bash
npm run build
# Deploy to Vercel
```

### Netlify

```bash
npm run build
# Drag and drop the build folder to Netlify
```

### Static Export

```bash
npm run build
npm run export
```

## 🤝 Contributing

We welcome contributions! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

This BMI calculator is for informational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.

## 🐛 Known Issues

- None currently reported

## 📞 Support

If you have any questions or run into issues, please:

1. Check the [existing issues](https://github.com/your-username/bmi-calculator/issues)
2. Create a new issue with detailed information

## 🙏 Acknowledgments

- React team for the amazing framework
- TypeScript for type safety
- Modern CSS for beautiful styling

---

**Made with ❤️ and React**