import { ComponentPropsWithoutRef } from "react";

type InputProps = ComponentPropsWithoutRef<"input"> & {
  label?: string;
  onRight?: () => JSX.Element;
  error?: string;
};

const Input = ({ label, onRight, error, ...props }: InputProps) => {
  return (
    <fieldset className="w-full flex flex-col gap-2">
      {label && <label className="text-sm">{label}</label>}
      <div
        className={`w-full flex gap-1 items-center justify-between px-[18px] py-5 text-sm placeholder:text-[#C4C4C4] 
                  border rounded-lg 
                  focus-within:outline focus-within:outline-primary
                  ${error ? 'border-red-500' : 'border-[#d9d9d9]'}`}
      >
        <input
          className="w-full text-sm placeholder:text-[#C4C4C4] outline-none"
          {...props}
        />
        {onRight && onRight()}
      </div>
      {error && (
        <span className="text-red-500 text-xs">{error}</span>
      )}
    </fieldset>
  );
};

export { Input };