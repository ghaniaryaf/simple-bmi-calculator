import { AgeCategory, Gender, BMIResult } from '../types/bmiTypes';

export const calculateStandardBMI = (weightKg: number, heightM: number): number => {
  return weightKg / (heightM * heightM);
};

export const calculateWHOAdjustedBMI = (bmi: number, ageNum: number, gender: Gender): number => {
  let adjusted = bmi;
  
  if (ageNum < 18) {
    adjusted *= 1 + ((ageNum - 10) * 0.01);
  } else if (ageNum > 40) {
    adjusted *= 0.98;
  }
  
  if (gender === 'female') {
    adjusted *= 1.02;
  }
  
  return adjusted;
};

export const calculateNewFormulaBMI = (weightKg: number, heightM: number, ageNum: number, gender: Gender): number => {
  let newBMI = 1.3 * (weightKg / Math.pow(heightM, 2.5));
  
  let ageFactor = 1;
  if (ageNum < 20) ageFactor = 0.95;
  else if (ageNum >= 20 && ageNum < 40) ageFactor = 1.0;
  else if (ageNum >= 40 && ageNum < 60) ageFactor = 1.02;
  else ageFactor = 1.05;
  
  let genderFactor = gender === 'male' ? 1.0 : 0.98;
  
  return newBMI * ageFactor * genderFactor;
};

export const classifyBMI = (bmi: number, ageNum: number): { category: string; color: string; healthRisk: string } => {
  let category = '';
  let color = '';
  let healthRisk = '';
  
  if (ageNum < 2) {
    if (bmi < 14) { category = 'Underweight'; color = '#3b82f6'; healthRisk = 'Nutritional deficiency risk'; }
    else if (bmi < 18) { category = 'Normal weight'; color = '#10b981'; healthRisk = 'Healthy growth'; }
    else if (bmi < 20) { category = 'At risk of overweight'; color = '#f59e0b'; healthRisk = 'Monitor growth'; }
    else { category = 'Overweight'; color = '#ef4444'; healthRisk = 'High weight for age'; }
  } 
  else if (ageNum >= 2 && ageNum <= 19) {
    if (bmi < 5) { category = 'Underweight'; color = '#3b82f6'; healthRisk = 'Below 5th percentile'; }
    else if (bmi < 85) { category = 'Healthy weight'; color = '#10b981'; healthRisk = '5th-84th percentile'; }
    else if (bmi < 95) { category = 'Overweight'; color = '#f59e0b'; healthRisk = '85th-94th percentile'; }
    else { category = 'Obese'; color = '#ef4444'; healthRisk = '95th+ percentile'; }
  }
  else {
    if (bmi < 18.5) { category = 'Underweight'; color = '#3b82f6'; healthRisk = 'Nutritional deficiency'; }
    else if (bmi < 25) { category = 'Normal weight'; color = '#10b981'; healthRisk = 'Low risk'; }
    else if (bmi < 30) { category = 'Overweight'; color = '#f59e0b'; healthRisk = 'Moderate risk'; }
    else { category = 'Obese'; color = '#ef4444'; healthRisk = 'High risk'; }
  }
  
  if (ageNum >= 65) {
    if (bmi < 23) { category = 'Underweight'; color = '#3b82f6'; healthRisk = 'Increased mortality risk'; }
    else if (bmi < 30) { category = 'Healthy weight'; color = '#10b981'; healthRisk = 'Optimal for elderly'; }
    else { category = 'Overweight'; color = '#f59e0b'; healthRisk = 'Monitor health'; }
  }
  
  return { category, color, healthRisk };
};

export const getRecommendations = (bmi: number, ageNum: number, gender: Gender, category: string): string[] => {
  const recommendations: string[] = [];
  
  if (ageNum < 12) {
    recommendations.push('Consult pediatrician for growth assessment');
    recommendations.push('Focus on balanced nutrition for growth');
    recommendations.push('Ensure adequate physical activity (60+ minutes daily)');
  } else if (ageNum >= 12 && ageNum <= 19) {
    recommendations.push('Maintain healthy growth patterns');
    recommendations.push('Limit screen time to 2 hours daily');
    recommendations.push('Engage in team sports or group activities');
  } else if (ageNum >= 20 && ageNum <= 39) {
    recommendations.push('Maintain regular exercise routine');
    recommendations.push('Focus on muscle-strengthening activities');
    recommendations.push('Monitor metabolic health markers');
  } else if (ageNum >= 40 && ageNum <= 59) {
    recommendations.push('Regular health screenings recommended');
    recommendations.push('Focus on maintaining muscle mass');
    recommendations.push('Consider bone density checks');
  } else {
    recommendations.push('Regular geriatric assessment');
    recommendations.push('Focus on mobility and balance exercises');
    recommendations.push('Monitor nutritional intake carefully');
  }
  
  if (category.includes('Underweight')) {
    recommendations.push('Increase calorie intake with nutrient-dense foods');
    recommendations.push('Consider nutritional supplements if advised');
    recommendations.push('Strength training to build muscle mass');
  } else if (category.includes('Overweight') || category.includes('Obese')) {
    recommendations.push('Gradual weight loss (0.5-1kg per week)');
    recommendations.push('Reduce processed food and sugar intake');
    recommendations.push('Increase daily physical activity');
  } else {
    recommendations.push('Maintain current healthy habits');
    recommendations.push('Regular health check-ups');
    recommendations.push('Stay hydrated and sleep 7-9 hours nightly');
  }
  
  if (gender === 'female' && ageNum >= 12) {
    recommendations.push('Monitor bone health (calcium & Vitamin D)');
  }
  if (gender === 'male' && ageNum >= 40) {
    recommendations.push('Regular prostate health screening');
  }
  
  return recommendations.slice(0, 4);
};

export const convertToMetric = (weight: number, height: number, unit: 'metric' | 'imperial') => {
  if (unit === 'metric') {
    return { weightKg: weight, heightM: height / 100 };
  }
  return {
    weightKg: weight * 0.453592,
    heightM: height * 0.0254
  };
};