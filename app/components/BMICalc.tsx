"use client";
import React, { useState, useEffect } from "react";
import BMIForm from "./BMIForm";
import BMIResults from "./BMIResults";
import {
  Gender,
  CalculationMethod,
  UnitSystem,
  BMIResult,
  ageCategories,
} from "../types/bmiTypes";
import {
  calculateStandardBMI,
  calculateWHOAdjustedBMI,
  calculateNewFormulaBMI,
  classifyBMI,
  getRecommendations,
  convertToMetric,
} from "../utils/bmiCalculations";
import styles from "./BMICalc.module.css";

const BMICalc: React.FC = () => {
  const [weight, setWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [gender, setGender] = useState<Gender>("male");
  const [ageStage, setAgeStage] = useState<string>("");
  const [bmiResult, setBmiResult] = useState<BMIResult | null>(null);
  const [calculationMethod, setCalculationMethod] =
    useState<CalculationMethod>("standard");
  const [unit, setUnit] = useState<UnitSystem>("metric");
  const [showDetails, setShowDetails] = useState<boolean>(false);

  useEffect(() => {
    if (age) {
      const ageNum = parseInt(age);
      const category = ageCategories.find(
        (cat) => ageNum >= cat.min && ageNum <= cat.max,
      );
      setAgeStage(category?.label || "");
    } else {
      setAgeStage("");
    }
  }, [age]);

  const calculateBMI = () => {
    if (!weight || !height || !age) {
      alert("Please enter weight, height, and age");
      return;
    }

    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);
    const ageNum = parseInt(age);

    if (
      isNaN(weightNum) ||
      isNaN(heightNum) ||
      isNaN(ageNum) ||
      weightNum <= 0 ||
      heightNum <= 0 ||
      ageNum <= 0
    ) {
      alert("Please enter valid positive numbers");
      return;
    }

    const { weightKg, heightM } = convertToMetric(weightNum, heightNum, unit);

    let bmi: number;

    switch (calculationMethod) {
      case "standard":
        bmi = calculateStandardBMI(weightKg, heightM);
        break;
      case "who":
        const standardBMI = calculateStandardBMI(weightKg, heightM);
        bmi = calculateWHOAdjustedBMI(standardBMI, ageNum, gender);
        break;
      case "new":
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
      recommendations: getRecommendations(
        roundedBMI,
        ageNum,
        gender,
        classification.category,
      ),
    };

    setBmiResult(result);
    setShowDetails(true);
  };

  const resetValues = () => {
    setWeight("");
    setHeight("");
    setAge("");
    setBmiResult(null);
    setShowDetails(false);
  };

  const getCategoryColor = () => {
    if (!bmiResult || !age) return "#6b7280";
    const classification = classifyBMI(bmiResult.value, parseInt(age));
    return classification.color;
  };

  return (
    <div className={styles.bmiCalcContainer}>
      <div className={styles.bmiCalcHeader}>
        <h1 className={styles.bmiCalcTitle}>Advanced BMI Calculator</h1>
        <p className={styles.bmiCalcSubtitle}>
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
    </div>
  );
};

export default BMICalc;
