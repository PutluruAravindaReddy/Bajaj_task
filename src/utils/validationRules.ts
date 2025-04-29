import { FormField } from "../types/formTypes";

/**
 * Dynamically generates validation rules for a form field.
 */
export const generateValidationRules = (field: FormField) => {
  const rules: any = {};

  if (field.required) {
    rules.required = `${field.label} is required`;
  }

  if (field.minLength) {
    rules.minLength = {
      value: field.minLength,
      message: `Minimum ${field.minLength} characters required`,
    };
  }

  if (field.maxLength) {
    rules.maxLength = {
      value: field.maxLength,
      message: `Maximum ${field.maxLength} characters allowed`,
    };
  }

  return rules;
};
