"use client";

import * as RadixSelect from "@radix-ui/react-select";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  CheckIcon,
} from "@radix-ui/react-icons";
import { forwardRef } from "react";

type Option = { value: string; label: string };

type SelectProps = {
  label?: string;
  error?: string;
  placeholder?: string;
  options: Option[];
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
};

const Select = forwardRef<HTMLButtonElement, SelectProps>(
  (
    { label, error, placeholder, options, value, onValueChange, disabled },
    ref
  ) => {
    return (
      <fieldset className="w-full flex flex-col gap-2">
        {label && <label className="text-sm">{label}</label>}

        <RadixSelect.Root
          value={value}
          onValueChange={onValueChange}
          disabled={disabled}
        >
          <RadixSelect.Trigger
            ref={ref}
            className={`w-full flex items-center justify-between px-[18px] py-5 text-sm rounded-lg border 
                        focus:outline-none focus:ring-1 focus:ring-primary
                        disabled:opacity-50 disabled:cursor-not-allowed
                        ${error ? "border-red-500" : "border-[#d9d9d9]"} 
                        data-[placeholder]:text-[#C4C4C4]`}
          >
            <RadixSelect.Value placeholder={placeholder} />
            <RadixSelect.Icon className="text-gray-500">
              <ChevronDownIcon />
            </RadixSelect.Icon>
          </RadixSelect.Trigger>

          <RadixSelect.Portal>
            <RadixSelect.Content
              className="overflow-hidden bg-white rounded-lg shadow-lg border border-[#d9d9d9] z-50"
              position="popper"
              sideOffset={4}
            >
              <RadixSelect.ScrollUpButton className="flex items-center justify-center h-6 bg-white text-gray-500">
                <ChevronUpIcon />
              </RadixSelect.ScrollUpButton>
              <RadixSelect.Viewport className="p-1">
                {options.map((option) => (
                  <RadixSelect.Item
                    key={option.value}
                    value={option.value}
                    className="text-sm text-black px-3 py-2 rounded-md cursor-pointer hover:bg-gray-100 focus:bg-gray-100 flex items-center gap-2 outline-none"
                  >
                    <RadixSelect.ItemText>{option.label}</RadixSelect.ItemText>
                    <RadixSelect.ItemIndicator className="ml-auto text-primary">
                      <CheckIcon />
                    </RadixSelect.ItemIndicator>
                  </RadixSelect.Item>
                ))}
              </RadixSelect.Viewport>
              <RadixSelect.ScrollDownButton className="flex items-center justify-center h-6 bg-white text-gray-500">
                <ChevronDownIcon />
              </RadixSelect.ScrollDownButton>
            </RadixSelect.Content>
          </RadixSelect.Portal>
        </RadixSelect.Root>

        {error && <span className="text-red-500 text-xs">{error}</span>}
      </fieldset>
    );
  }
);

Select.displayName = "Select";

export { Select };
