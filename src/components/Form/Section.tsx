import { useForm } from "react-hook-form";
import { FormSection, FormField } from "../../types/formTypes";
import { generateValidationRules } from "../../utils/validationRules";

interface SectionProps {
  data: FormSection;
  onNext: (data: Record<string, string | number | boolean>) => void;
  onPrev: () => void;
  onSubmit: (data: Record<string, string | number | boolean>) => void;
  isFirst: boolean;
  isLast: boolean;
}

export default function Section({ data, onNext, onPrev, onSubmit, isFirst, isLast }: SectionProps) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onFormSubmit = (formData: Record<string, string | number | boolean>) => {
    if (isLast) {
      onSubmit(formData);
    } else {
      onNext(formData);
    }
  };

  const renderField = (field: FormField) => {
    const commonProps = { ...register(field.dataTestId, generateValidationRules(field)) };

    switch (field.type) {
      case 'text':
      case 'email':
      case 'tel':
      case 'date':
        return <input type={field.type} placeholder={field.placeholder} {...commonProps} className="border p-2 rounded-md" />;

      case 'textarea':
        return <textarea placeholder={field.placeholder} {...commonProps} className="border p-2 rounded-md" />;

      case 'dropdown':
        return (
          <select {...commonProps} className="border p-2 rounded-md">
            <option value="">Select...</option>
            {field.options?.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        );

      case 'radio':
        return (
          <div className="flex gap-4">
            {field.options?.map((opt) => (
              <label key={opt.value} className="flex items-center gap-2">
                <input type="radio" value={opt.value} {...commonProps} className="accent-blue-600" />
                {opt.label}
              </label>
            ))}
          </div>
        );

      case 'checkbox':
        return (
          <div className="flex gap-4">
            {field.options?.map((opt) => (
              <label key={opt.value} className="flex items-center gap-2">
                <input type="checkbox" value={opt.value} {...register(field.dataTestId)} className="accent-green-600" />
                {opt.label}
              </label>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="flex flex-col gap-6">
      <h2 className="text-3xl font-bold">{data.title}</h2>
      <p className="text-gray-600">{data.description}</p>

      {data.fields.map((field) => (
        <div key={field.fieldId} className="flex flex-col">
          <label className="font-semibold mb-1">{field.label}</label>
          {renderField(field)}
          {errors[field.dataTestId] && (
            <p className="text-red-500 text-sm">{errors[field.dataTestId]?.message as string}</p>
          )}
        </div>
      ))}

      <div className="flex justify-between pt-6">
        {!isFirst && (
          <button type="button" onClick={onPrev} className="bg-gray-300 px-6 py-2 rounded hover:bg-gray-400">
            Prev
          </button>
        )}
        <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600">
          {isLast ? "Submit" : "Next"}
        </button>
      </div>
    </form>
  );
}
