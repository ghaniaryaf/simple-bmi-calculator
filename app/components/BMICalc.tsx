'use client';
import React, { useState, useEffect } from 'react';
import BMIForm from './BMIForm';
import BMIResults from './BMIResults';
import { 
  Gender, 
  CalculationMethod, 
  UnitSystem, 
  BMIResult, 
  ageCategories 
} from '../types/bmiTypes';
import {
  calculateStandardBMI,
  calculateWHOAdjustedBMI,
  calculateNewFormulaBMI,
  classifyBMI,
  getRecommendations,
  convertToMetric
} from '../utils/bmiCalculations';

const BMICalculator: React.FC = () => {
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [gender, setGender] = useState<Gender>('male');
  const [ageStage, setAgeStage] = useState<string>('');
  const [bmiResult, setBmiResult] = useState<BMIResult | null>(null);
  const [calculationMethod, setCalculationMethod] = useState<CalculationMethod>('standard');
  const [unit, setUnit] = useState<UnitSystem>('metric');
  const [showDetails, setShowDetails] = useState<boolean>(false);

  useEffect(() => {
    if (age) {
      const ageNum = parseInt(age);
      const category = ageCategories.find(cat => ageNum >= cat.min && ageNum <= cat.max);
      setAgeStage(category?.label || '');
    } else {
      setAgeStage('');
    }
  }, [age]);

  const calculateBMI = () => {
    if (!weight || !height || !age) {
      alert('Please enter weight, height, and age');
      return;
    }

    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);
    const ageNum = parseInt(age);

    if (isNaN(weightNum) || isNaN(heightNum) || isNaN(ageNum) || 
        weightNum <= 0 || heightNum <= 0 || ageNum <= 0) {
      alert('Please enter valid positive numbers');
      return;
    }

    const { weightKg, heightM } = convertToMetric(weightNum, heightNum, unit);

    let bmi: number;
    
    switch (calculationMethod) {
      case 'standard':
        bmi = calculateStandardBMI(weightKg, heightM);
        break;
      case 'who':
        const standardBMI = calculateStandardBMI(weightKg, heightM);
        bmi = calculateWHOAdjustedBMI(standardBMI, ageNum, gender);
        break;
      case 'new':
        bmi = calculateNewFormulaBMI(weightKg, heightM, ageNum, gender);
        break;
      default:
        bmi = calculateStandardBMI(weightKg, heightM);
    }

    const classification = classifyBMI(bmi, ageNum);
    const roundedBMI = parseFloat(bmi.toFixed(1));
    
    const result: BMIResult = {
      value: roundedBMI,
      category: classification.category,
      healthRisk: classification.healthRisk,
      recommendations: getRecommendations(roundedBMI, ageNum, gender, classification.category)
    };
    
    setBmiResult(result);
    setShowDetails(true);
  };

  const resetValues = () => {
    setWeight('');
    setHeight('');
    setAge('');
    setBmiResult(null);
    setShowDetails(false);
  };

  const getCategoryColor = () => {
    if (!bmiResult || !age) return '#6b7280';
    const classification = classifyBMI(bmiResult.value, parseInt(age));
    return classification.color;
  };

  return (
    <div style={{ 
      maxWidth: '600px', 
      margin: '40px auto', 
      padding: '32px', 
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
      background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
      borderRadius: '20px',
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      border: '1px solid #e2e8f0'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h1 style={{ 
          fontSize: '28px', 
          fontWeight: '700', 
          color: '#1e293b',
          marginBottom: '8px'
        }}>
          Advanced BMI Calculator
        </h1>
        <p style={{ 
          color: '#64748b',
          fontSize: '16px'
        }}>
          With gender, age stages, and multiple calculation methods
        </p>
      </div>
      
      <BMIForm
        weight={weight}
        height={height}
        age={age}
        gender={gender}
        unit={unit}
        calculationMethod={calculationMethod}
        ageStage={ageStage}
        onWeightChange={setWeight}
        onHeightChange={setHeight}
        onAgeChange={setAge}
        onGenderChange={setGender}
        onUnitChange={setUnit}
        onCalculationMethodChange={setCalculationMethod}
        onCalculate={calculateBMI}
        onReset={resetValues}
      />

      {bmiResult && (
        <BMIResults
          result={bmiResult}
          age={age}
          gender={gender}
          ageStage={ageStage}
          calculationMethod={calculationMethod}
          showDetails={showDetails}
          onToggleDetails={() => setShowDetails(!showDetails)}
          getCategoryColor={getCategoryColor}
        />
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default BMICalculator;