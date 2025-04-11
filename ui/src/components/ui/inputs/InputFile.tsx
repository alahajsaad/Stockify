// InputFile.tsx
import { useId, useRef, useState } from "react";
import { Upload, X } from "lucide-react";
import { Control, useController } from "react-hook-form";

interface InputFileProps {
  name: string;
  label: string;
  control: Control<any>;
  testId?: string;
}

const InputFile: React.FC<InputFileProps> = ({ name, label, control, testId }) => {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  
  const { field } = useController({
    name,
    control,
  });
  
  // Extract file from field.value if it exists
  const [selectedFile, setSelectedFile] = useState<File | null>(field.value || null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
    field.onChange(file); // Sync with RHF
  };
  
  const clearFile = () => {
    setSelectedFile(null);
    field.onChange(null); // Clear RHF state
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };
  
  return (
    <div className="w-full">
      <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {label}
      </label>
      <div className="relative">
        <label
          htmlFor={id}
          className="flex items-center gap-2 px-4 py-2 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg cursor-pointer dark:bg-gray-700 dark:border-gray-600 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          <Upload className={selectedFile ? "text-green-600" : "text-blue-600"} size={18} />
          {selectedFile ? selectedFile.name : "Choose a file"}
        </label>
        {selectedFile && (
          <button
            onClick={clearFile}
            type="button"
            className="absolute top-1/2 right-4 -translate-y-1/2 text-red-600 hover:bg-red-100 p-2 rounded-full focus:outline-none cursor-pointer transition"
            aria-label="Remove file"
          >
            <X size={18} />
          </button>
        )}
      </div>
      <input
        id={id}
        ref={inputRef}
        type="file"
        data-testid={testId}
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default InputFile;