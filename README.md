# 🏋️ Advanced BMI Calculator

A sophisticated BMI (Body Mass Index) calculator with multiple calculation methods, age-stage classifications, and personalized health recommendations.

![BMI Calculator Preview](https://img.shields.io/badge/Status-Functional-brightgreen)
![React](https://img.shields.io/badge/React-18.x-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

### 🔢 **Multiple BMI Formulas**
- **Standard BMI** - Traditional formula used worldwide
- **WHO Adjusted** - Age and gender-adjusted calculations
- **New Formula** - Advanced height-corrected calculation

### 👤 **Personalized Calculations**
- **Gender-specific** - Different calculations for males/females
- **6 Age Stages** - From infants to elderly (0-2, 2-12, 13-19, 20-39, 40-59, 60+)
- **Unit Conversion** - Switch between metric (kg/cm) and imperial (lbs/inches)

### 📊 **Detailed Results**
- BMI score with color-coded categories
- Health risk assessment
- Personalized recommendations
- Age-stage visualization
- Calculation method explanation

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm/yarn
- React 18+

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/bmi-calculator.git
cd bmi-calculator
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
├── components/
│   ├── BMICalculator.tsx    # Main container component
│   ├── BMIForm.tsx          # Input form component
│   └── BMIResults.tsx       # Results display component
├── utils/
│   └── bmiCalculations.ts   # All calculation logic
├── types/
│   └── bmiTypes.ts          # TypeScript interfaces and types
└── styles/
    └── global.css           # Global styles (optional)
```

## 🧮 Calculation Methods

### 1. **Standard BMI**
```
BMI = weight (kg) / height (m)²
```
- Most widely used formula
- Same for all ages and genders

### 2. **WHO Adjusted BMI**
```
Adjusted BMI = Standard BMI × Age Factor × Gender Factor
```
- Accounts for age and gender differences
- Better accuracy for children and elderly

### 3. **New BMI Formula**
```
New BMI = 1.3 × weight (kg) / height (m)²·⁵
```
- Addresses height bias in standard formula
- Better for very tall or short individuals

## 👶 Age Stages Classification

| Age Range | Stage | Special Considerations |
|-----------|-------|------------------------|
| 0-2 years | Infant | WHO growth chart based |
| 2-12 years | Child | CDC percentiles (5th-95th) |
| 13-19 years | Teen | Growth patterns monitored |
| 20-39 years | Young Adult | Peak health assessment |
| 40-59 years | Adult | Metabolic health focus |
| 60+ years | Elder | Geriatric health guidelines |

## 📈 BMI Categories

### Adults (20+ years)
| BMI Range | Category | Color | Health Risk |
|-----------|----------|-------|-------------|
| < 18.5 | Underweight | 🔵 Blue | Nutritional deficiency |
| 18.5-24.9 | Normal | 🟢 Green | Low risk |
| 25-29.9 | Overweight | 🟡 Yellow | Moderate risk |
| ≥ 30 | Obese | 🔴 Red | High risk |

### Children/Teens (2-19 years)
| Percentile | Category | Interpretation |
|------------|----------|----------------|
| < 5th | Underweight | Below normal growth |
| 5th-84th | Healthy weight | Normal growth pattern |
| 85th-94th | Overweight | Monitor growth |
| ≥ 95th | Obese | High weight for age |

## 🎯 Usage Instructions

1. **Select Measurement System**
   - Choose Metric (kg, cm) or Imperial (lbs, inches)

2. **Choose Calculation Method**
   - Standard: Basic calculation
   - WHO Adjusted: Age/gender adjusted
   - New Formula: Height-corrected

3. **Enter Personal Information**
   - Gender: Male or Female
   - Age: Your current age in years
   - Weight and Height

4. **Calculate BMI**
   - Click "Calculate BMI" button

5. **Review Results**
   - View your BMI score and category
   - Expand details for personalized recommendations

## 🛠️ Technical Details

### Technologies Used
- **React 18** with TypeScript
- **Functional Components** with Hooks
- **Inline CSS** for styling
- **Clean Architecture** with separation of concerns

### Key Design Decisions
1. **Single Responsibility Principle** - Each component has one job
2. **Type Safety** - Full TypeScript implementation
3. **Performance** - Memoized calculations where needed
4. **Accessibility** - Semantic HTML and keyboard navigation
5. **Responsive Design** - Works on mobile and desktop

### State Management
```typescript
// Main state variables
const [weight, setWeight] = useState<string>('');
const [height, setHeight] = useState<string>('');
const [age, setAge] = useState<string>('');
const [gender, setGender] = useState<'male' | 'female'>('male');
const [calculationMethod, setCalculationMethod] = useState<'standard' | 'who' | 'new'>('standard');
const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
```

## 📱 Responsive Design

The calculator is fully responsive and works on:
- 📱 Mobile phones (320px and up)
- 💻 Tablets (768px and up)
- 🖥️ Desktop (1024px and up)

## 🧪 Testing

Run the test suite:
```bash
npm test
# or
yarn test
```

Test coverage includes:
- Unit tests for calculation functions
- Component rendering tests
- User interaction tests
- Edge case validations

## 🔧 Customization

### Adding New Age Categories
Edit `ageCategories` in `types/bmiTypes.ts`:
```typescript
{ min: 70, max: 200, label: 'Senior (70+)' }
```

### Adding New Calculation Methods
1. Add method to `calculationMethods` array
2. Implement function in `bmiCalculations.ts`
3. Add case in `calculateBMI` function

### Styling Customization
Modify inline styles in components or create CSS modules:
```typescript
// Add to BMICalculator.tsx
import styles from './BMICalculator.module.css';
```

## ⚠️ Medical Disclaimer

**Important:** This BMI calculator is for educational and informational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment.

- BMI does not measure body fat percentage
- Does not account for muscle mass, bone density, or body composition
- Not suitable for pregnant women or competitive athletes
- Always consult with healthcare professionals for health assessments

## 📄 License

MIT License - See [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📊 Data Sources

1. **WHO Growth Standards** - For infants and children
2. **CDC Growth Charts** - For children and teens
3. **NIH BMI Guidelines** - For adults
4. **Oxford University Research** - For new BMI formula

## 🔍 References

1. World Health Organization. (2006). *BMI classification*
2. Centers for Disease Control and Prevention. (2000). *Growth Charts*
3. Trefethen, N. (2013). *A new body mass index*
4. National Institutes of Health. (1998). *Clinical Guidelines*

## 🙏 Acknowledgments

- World Health Organization for BMI standards
- CDC for growth percentile data
- Oxford University for height-corrected BMI research
- All contributors and testers

---

**Made with ❤️ for health-conscious developers**

For questions or support, please [open an issue](https://github.com/yourusername/bmi-calculator/issues) or contact the maintainers.