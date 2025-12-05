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
    <div className="space-y-6">
      {/* Unit Selector */}
      <div>
        <label className="block mb-2 text-sm font-semibold text-gray-700">
          Measurement System
        </label>
        <div className="inline-flex p-1 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-inner">
          <button
            type="button"
            onClick={() => onUnitChange('metric')}
            className={`
              px-5 py-2.5 rounded-lg font-semibold transition-all duration-300 transform
              ${unit === 'metric' 
                ? 'bg-white text-blue-700 shadow-lg scale-[1.02] ring-2 ring-blue-200' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-white/50'
              }
            `}
          >
            Metric (kg, cm)
          </button>
          <button
            type="button"
            onClick={() => onUnitChange('imperial')}
            className={`
              px-5 py-2.5 rounded-lg font-semibold transition-all duration-300 transform
              ${unit === 'imperial' 
                ? 'bg-white text-blue-700 shadow-lg scale-[1.02] ring-2 ring-blue-200' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-white/50'
              }
            `}
          >
            Imperial (lbs, inches)
          </button>
        </div>
      </div>

      {/* Calculation Method Selector */}
      <div>
        <label className="block mb-2 text-sm font-semibold text-gray-700">
          Calculation Method
        </label>
        <div className="grid grid-cols-3 gap-3">
          {calculationMethods.map(method => (
            <button
              key={method.value}
              type="button"
              onClick={() => onCalculationMethodChange(method.value as CalculationMethod)}
              className={`
                p-3 rounded-xl border-2 transition-all duration-300
                flex flex-col items-center justify-center
                hover:scale-[1.02] active:scale-[0.98]
                ${calculationMethod === method.value 
                  ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-white shadow-lg ring-2 ring-blue-100' 
                  : 'border-gray-200 bg-white hover:border-blue-300'
                }
              `}
            >
              <span className="font-semibold text-gray-800">{method.label}</span>
              <span className="text-xs text-gray-500 mt-1">{method.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Gender and Age */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Gender
          </label>
          <div className="flex gap-3">
            {(['male', 'female'] as const).map(g => (
              <button
                key={g}
                type="button"
                onClick={() => onGenderChange(g)}
                className={`
                  flex-1 py-3 rounded-xl font-semibold transition-all duration-300
                  transform hover:scale-[1.02] active:scale-[0.98]
                  ${gender === g 
                    ? g === 'male' 
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg' 
                      : 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg'
                    : 'bg-white text-gray-600 border-2 border-gray-200 hover:border-blue-300'
                  }
                `}
              >
                <div className="flex items-center justify-center gap-2">
                  {g === 'male' ? (
                    <span className="text-lg">♂</span>
                  ) : (
                    <span className="text-lg">♀</span>
                  )}
                  <span className="capitalize">{g}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Age (years)
          </label>
          <div className="relative">
            <input
              type="number"
              value={age}
              onChange={(e) => onAgeChange(e.target.value)}
              min="1"
              max="120"
              placeholder="Enter your age"
              className="w-full px-4 py-3 pl-12 text-gray-800 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          {ageStage && (
            <div className="mt-3 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-blue-700">Age Stage:</span>
                <span className="text-sm font-semibold text-blue-800">{ageStage}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input Fields */}
      <div className="space-y-5">
        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Weight ({unit === 'metric' ? 'kilograms' : 'pounds'})
          </label>
          <div className="relative">
            <input
              type="number"
              value={weight}
              onChange={(e) => onWeightChange(e.target.value)}
              placeholder={`Enter weight in ${unit === 'metric' ? 'kg' : 'lbs'}`}
              step="0.1"
              className="w-full px-4 py-3 pl-12 text-gray-800 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
              </svg>
            </div>
          </div>
        </div>

        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Height ({unit === 'metric' ? 'centimeters' : 'inches'})
          </label>
          <div className="relative">
            <input
              type="number"
              value={height}
              onChange={(e) => onHeightChange(e.target.value)}
              placeholder={`Enter height in ${unit === 'metric' ? 'cm' : 'inches'}`}
              step="0.1"
              className="w-full px-4 py-3 pl-12 text-gray-800 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 pt-2">
        <button
          onClick={onCalculate}
          className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
        >
          <div className="flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <span>Calculate BMI</span>
          </div>
        </button>
        <button
          onClick={onReset}
          className="px-6 py-4 bg-white text-gray-600 font-semibold border-2 border-gray-200 rounded-xl hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
        >
          <div className="flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>Reset</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default BMIForm;