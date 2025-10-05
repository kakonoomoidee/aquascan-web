import React, { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { IconChevronUpDown, IconCheck } from "@src/components/icons/index";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  selected: Option;
  onChange: (value: Option) => void;
  label: string;
  leadingIcon?: React.ReactNode;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  selected,
  onChange,
  label,
  leadingIcon,
}) => {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-600 mb-2">
        {label}
      </label>
      <Listbox value={selected} onChange={onChange}>
        <div className="relative">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-slate-50 py-2.5 pl-10 pr-10 text-left border border-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 transition">
            {leadingIcon && (
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                {leadingIcon}
              </span>
            )}
            <span className="block truncate">{selected.label}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <IconChevronUpDown className="h-5 w-5 text-gray-400" />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg border border-slate-200 focus:outline-none sm:text-sm z-10">
              {options.map((option) => (
                <Listbox.Option
                  key={option.value}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-sky-100 text-sky-900" : "text-gray-900"
                    }`
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {option.label}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-sky-600">
                          <IconCheck className="h-5 w-5" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};
