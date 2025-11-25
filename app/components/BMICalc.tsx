'use client';
import React, { useState } from 'react';

const BMICalculator: React.FC = () => {
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState<string>('');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');

  const calculateBMI = () => {
    if (!weight || !height) {
      alert('Please enter both weight and height');
      return;
    }

    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);

    if (isNaN(weightNum) || isNaN(heightNum) || weightNum <= 0 || heightNum <= 0) {
      alert('Please enter valid positive numbers');
      return;
    }

    let calculatedBMI: number;
    
    if (unit === 'metric') {
      // Metric: kg and cm
      calculatedBMI = weightNum / ((heightNum / 100) ** 2);
    } else {
      // Imperial: lbs and inches
      calculatedBMI = (weightNum / (heightNum ** 2)) * 703;
    }

    const roundedBMI = parseFloat(calculatedBMI.toFixed(1));
    setBmi(roundedBMI);
    classifyBMI(roundedBMI);
  };

  const classifyBMI = (value: number) => {
    if (value < 18.5) setCategory('Underweight');
    else if (value < 25) setCategory('Normal weight');
    else if (value < 30) setCategory('Overweight');
    else setCategory('Obese');
  };

  const getCategoryColor = () => {
    if (!category) return '#6b7280';
    if (category === 'Underweight') return '#3b82f6';
    if (category === 'Normal weight') return '#10b981';
    if (category === 'Overweight') return '#f59e0b';
    return '#ef4444';
  };

  const resetValues = () => {
    setWeight('');
    setHeight('');
    setBmi(null);
    setCategory('');
  };

  return (
    <div style={{ 
      maxWidth: '480px', 
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
          BMI Calculator
        </h1>
        <p style={{ 
          color: '#64748b',
          fontSize: '16px'
        }}>
          Calculate your Body Mass Index
        </p>
      </div>
      
      {/* Unit Selector */}
      <div style={{ 
        marginBottom: '28px', 
        display: 'flex',
        background: '#f1f5f9',
        borderRadius: '12px',
        padding: '4px',
        width: 'fit-content',
        margin: '0 auto 28px'
      }}>
        <button
          type="button"
          onClick={() => setUnit('metric')}
          style={{
            padding: '10px 20px',
            borderRadius: '8px',
            border: 'none',
            background: unit === 'metric' ? 'white' : 'transparent',
            color: unit === 'metric' ? '#1e293b' : '#64748b',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: unit === 'metric' ? '0 2px 4px rgba(0, 0, 0, 0.1)' : 'none',
            transition: 'all 0.2s ease'
          }}
        >
          Metric (kg, cm)
        </button>
        <button
          type="button"
          onClick={() => setUnit('imperial')}
          style={{
            padding: '10px 20px',
            borderRadius: '8px',
            border: 'none',
            background: unit === 'imperial' ? 'white' : 'transparent',
            color: unit === 'imperial' ? '#1e293b' : '#64748b',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: unit === 'imperial' ? '0 2px 4px rgba(0, 0, 0, 0.1)' : 'none',
            transition: 'all 0.2s ease'
          }}
        >
          Imperial (lbs, inches)
        </button>
      </div>

      {/* Input Fields */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '8px', 
            fontWeight: '600',
            color: '#374151',
            fontSize: '14px'
          }}>
            Weight ({unit === 'metric' ? 'kilograms' : 'pounds'})
          </label>
          <div style={{ position: 'relative' }}>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder={`Enter weight in ${unit === 'metric' ? 'kg' : 'lbs'}`}
              style={{
                width: '100%',
                padding: '14px 16px',
                border: '2px solid #e2e8f0',
                borderRadius: '12px',
                fontSize: '16px',
                transition: 'all 0.2s ease',
                background: 'white'
              }}
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
            />
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '8px', 
            fontWeight: '600',
            color: '#374151',
            fontSize: '14px'
          }}>
            Height ({unit === 'metric' ? 'centimeters' : 'inches'})
          </label>
          <div style={{ position: 'relative' }}>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder={`Enter height in ${unit === 'metric' ? 'cm' : 'inches'}`}
              style={{
                width: '100%',
                padding: '14px 16px',
                border: '2px solid #e2e8f0',
                borderRadius: '12px',
                fontSize: '16px',
                transition: 'all 0.2s ease',
                background: 'white'
              }}
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
            />
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
        <button
          onClick={calculateBMI}
          style={{
            flex: 1,
            padding: '14px 20px',
            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 4px 6px rgba(59, 130, 246, 0.25)',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          Calculate BMI
        </button>
        <button
          onClick={resetValues}
          style={{
            flex: 1,
            padding: '14px 20px',
            background: 'white',
            color: '#64748b',
            border: '2px solid #e2e8f0',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.background = '#f8fafc'}
          onMouseOut={(e) => e.currentTarget.style.background = 'white'}
        >
          Reset
        </button>
      </div>

      {/* Results */}
      {bmi && (
        <div style={{
          marginTop: '24px',
          padding: '24px',
          background: 'white',
          borderRadius: '16px',
          textAlign: 'center',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          border: `2px solid ${getCategoryColor()}`,
          animation: 'fadeIn 0.5s ease'
        }}>
          <h2 style={{ 
            fontSize: '18px', 
            fontWeight: '600',
            color: '#374151',
            marginBottom: '16px'
          }}>
            Your Results
          </h2>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            gap: '16px',
            marginBottom: '16px'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: `conic-gradient(${getCategoryColor()} 0% ${Math.min(bmi / 40 * 100, 100)}%, #e2e8f0 ${Math.min(bmi / 40 * 100, 100)}% 100%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '700',
                fontSize: '18px',
                color: '#1e293b'
              }}>
                {bmi}
              </div>
            </div>
            
            <div style={{ textAlign: 'left' }}>
              <div style={{ 
                fontSize: '14px', 
                color: '#64748b',
                marginBottom: '4px'
              }}>
                BMI
              </div>
              <div style={{ 
                fontSize: '24px', 
                fontWeight: '700',
                color: '#1e293b'
              }}>
                {bmi}
              </div>
              <div style={{ 
                fontSize: '16px', 
                fontWeight: '600',
                color: getCategoryColor()
              }}>
                {category}
              </div>
            </div>
          </div>

          <div style={{ 
            marginTop: '20px', 
            padding: '16px',
            background: '#f8fafc',
            borderRadius: '12px',
            fontSize: '14px',
            color: '#64748b',
            textAlign: 'left'
          }}>
            <div style={{ fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
              BMI Categories:
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Underweight:</span>
                <span style={{ fontWeight: '600' }}>&lt; 18.5</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Normal weight:</span>
                <span style={{ fontWeight: '600' }}>18.5 – 24.9</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Overweight:</span>
                <span style={{ fontWeight: '600' }}>25 – 29.9</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Obese:</span>
                <span style={{ fontWeight: '600' }}>≥ 30</span>
              </div>
            </div>
          </div>
        </div>
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