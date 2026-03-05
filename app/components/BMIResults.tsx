import React from "react";
import { BMIResult, ageCategories } from "../types/bmiTypes";
import styles from "./BMIResults.module.css";

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
  getCategoryColor,
}) => {
  return (
    <div
      className={styles.bmiResults}
      style={{ borderColor: getCategoryColor() }}
    >
      <div className={styles.bmiResultsHeader}>
        <h2 className={styles.bmiResultsTitle}>Your BMI Results</h2>
        <button
          className={styles.bmiResultsToggleBtn}
          onClick={onToggleDetails}
        >
          {showDetails ? "Hide Details" : "Show Details"}
        </button>
      </div>

      <div className={styles.bmiResultsScore}>
        <div>
          <div className={styles.bmiResultsLabel}>BMI Score</div>
          <div className={styles.bmiResultsValue}>{result.value}</div>
        </div>

        <div className={styles.bmiResultsCategory}>
          <div className={styles.bmiResultsLabel}>Category</div>
          <div
            className={styles.bmiResultsCategoryText}
            style={{ color: getCategoryColor() }}
          >
            {result.category}
          </div>
        </div>
      </div>

      {showDetails && (
        <>
          <div className={styles.bmiResultsDetailSection}>
            <div className={styles.bmiResultsDetailTitle}>
              Health Risk Assessment
            </div>
            <div className={styles.bmiResultsDetailText}>
              {result.healthRisk}
            </div>
          </div>

          <div className={styles.bmiResultsRecommendations}>
            <div className={styles.bmiResultsDetailTitle}>
              Recommendations for {gender} ({ageStage})
            </div>
            <div className={styles.bmiResultsRecommendationsList}>
              {result.recommendations.map((rec, index) => (
                <div
                  key={index}
                  className={styles.bmiResultsRecommendationItem}
                >
                  <span className={styles.bmiResultsBullet}>•</span>
                  <span>{rec}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.bmiResultsFootnote}>
            <div className={styles.bmiResultsFootnoteTitle}>
              Calculation Method Used:
            </div>
            <div>
              {calculationMethod === "standard" &&
                "Standard BMI Formula: weight / (height²)"}
              {calculationMethod === "who" &&
                "WHO Adjusted: Standard BMI adjusted for age and gender factors"}
              {calculationMethod === "new" &&
                "New Formula: 1.3 × weight / (height²·⁵) with age/gender factors"}
            </div>
            <div className={styles.bmiResultsDisclaimer}>
              Note: This calculator provides educational information only.
              Consult healthcare professionals for medical advice.
            </div>
          </div>
        </>
      )}

      <div className={styles.bmiResultsAgeCategories}>
        <div className={styles.bmiResultsAgeCategoriesTitle}>
          Age Stage Categories:
        </div>
        <div className={styles.ageCategoriesGrid}>
          {ageCategories.map((cat) => (
            <div
              key={cat.label}
              className={`${styles.ageCategoryItem} ${
                ageStage === cat.label ? styles.active : ""
              }`}
            >
              <div className={styles.ageCategoryLabel}>{cat.label}</div>
              <div className={styles.ageCategoryRange}>
                {cat.min}-{cat.max} years
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BMIResults;
