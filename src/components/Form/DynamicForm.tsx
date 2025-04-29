import { useFormManager } from "../../hooks/useFormManager";
import Section from "./Section";
import { FormSection } from "../../types/formTypes";

interface DynamicFormProps {
  sections: FormSection[];
}

export default function DynamicForm({ sections }: DynamicFormProps) {
  const { currentSection, isFirst, isLast, goNext, goPrev, submitForm } = useFormManager(sections);

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <Section
          data={currentSection}
          onNext={goNext}
          onPrev={goPrev}
          onSubmit={submitForm}
          isFirst={isFirst}
          isLast={isLast}
        />
      </div>
    </div>
  );
}
