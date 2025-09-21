import { ComponentPropsWithoutRef } from "react";

type TextareaProps = ComponentPropsWithoutRef<"textarea"> & {
  label?: string;
};

const Textarea = ({ label, ...props }: TextareaProps) => {
  return (
    <fieldset className="w-full flex flex-col gap-2">
      {label && <label className="text-sm ">{label}</label>}
      <div
        className="w-full flex gap-1 items-center justify-between px-[18px] py-5 text-sm placeholder:text-[#C4C4C4] 
                  border border-[#d9d9d9] rounded-lg 
                  focus-within:outline focus-within:outline-primary"
      >
        <textarea
          className="w-full text-sm placeholder:text-[#C4C4C4] outline-none resize-none"
          {...props}
        />
      </div>
    </fieldset>
  );
};

export { Textarea };
