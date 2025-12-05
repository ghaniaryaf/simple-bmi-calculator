export interface AgeCategory {
  min: number;
  max: number;
  label: string;
}

export interface BMIResult {
  value: number;
  category: string;
  healthRisk: string;
  recommendations: string[];
}

export type Gender = 'male' | 'female';
export type CalculationMethod = 'standard' | 'who' | 'new';
export type UnitSystem = 'metric' | 'imperial';

export const ageCategories: AgeCategory[] = [
  { min: 0, max: 2, label: 'Infant (0-2)' },
  { min: 2, max: 12, label: 'Child (2-12)' },
  { min: 13, max: 19, label: 'Teen (13-19)' },
  { min: 20, max: 39, label: 'Young Adult (20-39)' },
  { min: 40, max: 59, label: 'Adult (40-59)' },
  { min: 60, max: 200, label: 'Elder (60+)' }
];

export const calculationMethods = [
  { value: 'standard', label: 'Standard', desc: 'Basic BMI' },
  { value: 'who', label: 'WHO Adjusted', desc: 'Age & gender' },
  { value: 'new', label: 'New Formula', desc: 'Advanced' }
];