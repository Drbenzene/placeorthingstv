interface InputfieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  OnFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
  error: string | null | undefined;
}
function Inputfield(inputfieldProps: InputfieldProps) {
  const { label, placeholder, value, onChange, onBlur, OnFocus, error } =
    inputfieldProps;
  return (
    <div>
      <label className="block mb-2 text-xs text-start font-medium text-[#FBE901]">
        {label}
      </label>
      <input
        aria-placeholder={placeholder}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={OnFocus}
        required
        autoComplete="on"
        autoCorrect="off"
        spellCheck="false"
        autoCapitalize="off"
        maxLength={100}
        minLength={3}
        // pattern="^[a-zA-Z0-9\s]+$@."
        // title="Only alphanumeric characters and spaces are allowed."
        className="w-full p-2 text-white placeholder:text-gray-400 placeholder:text-sm border-2 border-[rgb(72,80,86)] rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {error && <p className="text-start text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

export default Inputfield;
