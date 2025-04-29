import { useState } from "react";
import { createUser, getForm } from "../../services/apiService";
import { FormResponse } from "../../types/formTypes";

interface LoginFormProps {
  onSuccess: (form: FormResponse['form']) => void;
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const [rollNumber, setRollNumber] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);
      await createUser(rollNumber, name);
      const formResponse = await getForm(rollNumber);
      onSuccess(formResponse.form);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Student Login</h2>

        <input
          type="text"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
          placeholder="Roll Number"
          className="border p-2 mb-4 w-full rounded-md"
          required
        />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="border p-2 mb-6 w-full rounded-md"
          required
        />

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button type="submit" disabled={loading} className="bg-blue-600 text-white py-2 w-full rounded-md hover:bg-blue-700 transition">
          {loading ? 'Processing...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
