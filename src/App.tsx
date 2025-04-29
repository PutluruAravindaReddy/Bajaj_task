import { useState } from "react";
import LoginForm from "./components/User/LoginForm";
import DynamicForm from "./components/Form/DynamicForm";
import { FormResponse } from "./types/formTypes";

function App() {
  const [form, setForm] = useState<FormResponse['form'] | null>(null);

  return (
    <div>
      {!form ? (
        <LoginForm onSuccess={(formData) => setForm(formData)} />
      ) : (
        <DynamicForm sections={form.sections} />
      )}
    </div>
  );
}

export default App;
