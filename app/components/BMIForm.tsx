import React from 'react';
import { CalculationMethod, UnitSystem, Gender, calculationMethods } from '../types/bmiTypes';

interface BMIFormProps {
  weight: string;
  height: string;
  age: string;
  gender: Gender;
  unit: UnitSystem;
  calculationMethod: CalculationMethod;
  ageStage: string;
  onWeightChange: (value: string) => void;
  onHeightChange: (value: string) => void;
  onAgeChange: (value: string) => void;
  onGenderChange: (gender: Gender) => void;
  onUnitChange: (unit: UnitSystem) => void;
  onCalculationMethodChange: (method: CalculationMethod) => void;
  onCalculate: () => void;
  onReset: () => void;
}

const BMIForm: React.FC<BMIFormProps> = ({
  weight,
  height,
  age,
  gender,
  unit,
  calculationMethod,
  ageStage,
  onWeightChange,
  onHeightChange,
  onAgeChange,
  onGenderChange,
  onUnitChange,
  onCalculationMethodChange,
  onCalculate,
  onReset
}) => {
  return (
    <div>
      {/* Unit Selector */}
      <div style={{ marginBottom: '24px' }}>
        <label style={{ 
          display: 'block', 
          marginBottom: '8px', 
          fontWeight: '600',
          color: '#374151',
          fontSize: '14px'
        }}>
          Measurement System
        </label>
        <div style={{ 
          display: 'flex',
          background: '#f1f5f9',
          borderRadius: '12px',
          padding: '4px',
          width: 'fit-content'
        }}>
          <button
            type="button"
            onClick={() => onUnitChange('metric')}
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
            onClick={() => onUnitChange('imperial')}
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
      </div>

      {/* Calculation Method Selector */}
      <div style={{ marginBottom: '24px' }}>
        <label style={{ 
          display: 'block', 
          marginBottom: '8px', 
          fontWeight: '600',
          color: '#374151',
          fontSize: '14px'
        }}>
          Calculation Method
        </label>
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '8px'
        }}>
          {calculationMethods.map(method => (
            <button
              key={method.value}
              type="button"
              onClick={() => onCalculationMethodChange(method.value as CalculationMethod)}
              style={{
                padding: '12px 8px',
                borderRadius: '8px',
                border: '2px solid',
                borderColor: calculationMethod === method.value ? '#3b82f6' : '#e2e8f0',
                background: calculationMethod === method.value ? '#eff6ff' : 'white',
                color: calculationMethod === method.value ? '#1e293b' : '#64748b',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <span style={{ fontSize: '14px' }}>{method.label}</span>
              <span style={{ fontSize: '11px', opacity: 0.7, marginTop: '4px' }}>{method.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Gender and Age */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
        <div>
          <label style={{ 
            display: 'block', 
            marginBottom: '8px', 
            fontWeight: '600',
            color: '#374151',
            fontSize: '14px'
          }}>
            Gender
          </label>
          <div style={{ display: 'flex', gap: '12px' }}>
            {(['male', 'female'] as const).map(g => (
              <button
                key={g}
                type="button"
                onClick={() => onGenderChange(g)}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '8px',
                  border: '2px solid',
                  borderColor: gender === g ? (g === 'male' ? '#3b82f6' : '#ec4899') : '#e2e8f0',
                  background: gender === g ? (g === 'male' ? '#eff6ff' : '#fdf2f8') : 'white',
                  color: gender === g ? '#1e293b' : '#64748b',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textTransform: 'capitalize'
                }}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label style={{ 
            display: 'block', 
            marginBottom: '8px', 
            fontWeight: '600',
            color: '#374151',
            fontSize: '14px'
          }}>
            Age (years)
          </label>
          <input
            type="number"
            value={age}
            onChange={(e) => onAgeChange(e.target.value)}
            min="1"
            max="120"
            placeholder="Enter age"
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
          {ageStage && (
            <div style={{
              marginTop: '8px',
              padding: '8px 12px',
              background: '#f0f9ff',
              borderRadius: '8px',
              fontSize: '14px',
              color: '#0369a1',
              fontWeight: '500'
            }}>
              Age Stage: {ageStage}
            </div>
          )}
        </div>
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
          <input
            type="number"
            value={weight}
            onChange={(e) => onWeightChange(e.target.value)}
            placeholder={`Enter weight in ${unit === 'metric' ? 'kg' : 'lbs'}`}
            step="0.1"
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
          <input
            type="number"
            value={height}
            onChange={(e) => onHeightChange(e.target.value)}
            placeholder={`Enter height in ${unit === 'metric' ? 'cm' : 'inches'}`}
            step="0.1"
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

      {/* Buttons */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
        <button
          onClick={onCalculate}
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
          onClick={onReset}
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
    </div>
  );
};

export default BMIForm;