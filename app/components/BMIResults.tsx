import React from 'react';
import { BMIResult, ageCategories } from '../types/bmiTypes';

interface BMIResultsProps {
  result: BMIResult;
  age: string;
  gender: string;
  ageStage: string;
  calculationMethod: string;
  showDetails: boolean;
  onToggleDetails: () => void;
  getCategoryColor: () => string;
}

const BMIResults: React.FC<BMIResultsProps> = ({
  result,
  age,
  gender,
  ageStage,
  calculationMethod,
  showDetails,
  onToggleDetails,
  getCategoryColor
}) => {
  return (
    <div style={{
      marginTop: '24px',
      padding: '24px',
      background: 'white',
      borderRadius: '16px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
      border: `2px solid ${getCategoryColor()}`,
      animation: 'fadeIn 0.5s ease'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ 
          fontSize: '20px', 
          fontWeight: '700',
          color: '#1e293b'
        }}>
          Your BMI Results
        </h2>
        <button
          onClick={onToggleDetails}
          style={{
            padding: '8px 16px',
            background: '#f8fafc',
            color: '#64748b',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          {showDetails ? 'Hide Details' : 'Show Details'}
        </button>
      </div>
      
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        marginBottom: '20px'
      }}>
        <div>
          <div style={{ 
            fontSize: '14px', 
            color: '#64748b',
            marginBottom: '4px'
          }}>
            BMI Score
          </div>
          <div style={{ 
            fontSize: '36px', 
            fontWeight: '700',
            color: '#1e293b'
          }}>
            {result.value}
          </div>
        </div>
        
        <div style={{ textAlign: 'right' }}>
          <div style={{ 
            fontSize: '14px', 
            color: '#64748b',
            marginBottom: '4px'
          }}>
            Category
          </div>
          <div style={{ 
            fontSize: '20px', 
            fontWeight: '700',
            color: getCategoryColor()
          }}>
            {result.category}
          </div>
        </div>
      </div>

      {showDetails && (
        <>
          <div style={{ 
            marginBottom: '20px', 
            padding: '16px',
            background: '#f8fafc',
            borderRadius: '12px'
          }}>
            <div style={{ 
              fontSize: '14px', 
              fontWeight: '600',
              color: '#374151',
              marginBottom: '8px'
            }}>
              Health Risk Assessment
            </div>
            <div style={{ 
              fontSize: '14px',
              color: '#64748b'
            }}>
              {result.healthRisk}
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <div style={{ 
              fontSize: '14px', 
              fontWeight: '600',
              color: '#374151',
              marginBottom: '12px'
            }}>
              Recommendations for {gender} ({ageStage})
            </div>
            <div style={{ 
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              {result.recommendations.map((rec, index) => (
                <div key={index} style={{
                  padding: '12px',
                  background: '#f0f9ff',
                  borderRadius: '8px',
                  fontSize: '14px',
                  color: '#0369a1',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '8px'
                }}>
                  <span style={{ fontSize: '12px', marginTop: '2px' }}>•</span>
                  <span>{rec}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ 
            marginTop: '20px', 
            padding: '16px',
            background: '#f8fafc',
            borderRadius: '12px',
            fontSize: '14px',
            color: '#64748b'
          }}>
            <div style={{ fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
              Calculation Method Used:
            </div>
            <div style={{ marginBottom: '4px' }}>
              {calculationMethod === 'standard' && 'Standard BMI Formula: weight / (height²)'}
              {calculationMethod === 'who' && 'WHO Adjusted: Standard BMI adjusted for age and gender factors'}
              {calculationMethod === 'new' && 'New Formula: 1.3 × weight / (height²·⁵) with age/gender factors'}
            </div>
            <div style={{ marginTop: '12px', fontSize: '12px', opacity: 0.7 }}>
              Note: This calculator provides educational information only. Consult healthcare professionals for medical advice.
            </div>
          </div>
        </>
      )}

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
          Age-Stage Categories:
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
          {ageCategories.map((cat) => (
            <div key={cat.label} style={{
              padding: '8px',
              background: ageStage === cat.label ? '#dbeafe' : 'white',
              borderRadius: '6px',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ fontWeight: '500', fontSize: '12px' }}>{cat.label}</div>
              <div style={{ fontSize: '11px', opacity: 0.7 }}>{cat.min}-{cat.max} years</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BMIResults;