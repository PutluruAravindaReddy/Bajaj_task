import { useState } from "react";
import { FormSection } from "../types/formTypes";

/**
 * Custom hook to manage multi-section form navigation.
 */
export const useFormManager = (sections: FormSection[]) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [formData, setFormData] = useState<Record<string, string | number | boolean>>({});

  const goNext = (data: Record<string, string | number | boolean>) => {
    setFormData(prev => ({ ...prev, ...data }));
    setCurrentIndex(prev => prev + 1);
  };

  const goPrev = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  const submitForm = (data: Record<string, string | number | boolean>) => {
    const finalData = { ...formData, ...data };
    console.log("Submitted Form Data:", finalData);
  };

  return {
    currentSection: sections[currentIndex],
    isFirst: currentIndex === 0,
    isLast: currentIndex === sections.length - 1,
    goNext,
    goPrev,
    submitForm,
  };
};
