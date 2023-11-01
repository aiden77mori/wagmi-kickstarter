import { forwardRef, useRef, useState } from "react";
import { useController } from "react-hook-form";
import { InfoTooltip } from "./InfoTooltip";
import { ArrowDownIcon } from "./icons/ArrowDownIcon";
import { useClickAway } from "react-use";

export const DropdownField = forwardRef(
  (
    {
      label,
      hasError,
      value,
      name,
      placeholder,
      onChange,
      onBlur,
      error,
      infoTooltip,
      helpText,
      readOnly,
      inputProps,
      append,
      dropdownTitle,
      options,
      ...rest
    },
    ref
  ) => {
    const [open, setOpen] = useState(false);
    const handlerRef = useRef(null);
    const dropdownRef = useRef(null);
    useClickAway(dropdownRef, (event) => {
      if (!open) return;
      if (handlerRef.current === event.target) return;
      if (handlerRef.current.contains(event.target)) return

      setOpen(false)
    });

    const selectedOption = options.find((o) => o.value === value);

    const handleSelect = (value) => {
      onChange(value);
      setOpen(false);
    };

    return (
      <div {...rest}>
        <div className="flex justify-between items-center mb-[8px] text-white/50 capitalize">
          {label && (
            <label className="">
              {label}
              {infoTooltip && (
                <InfoTooltip text={infoTooltip} className="ml-3" />
              )}
            </label>
          )}

          {helpText && <div className="text-white">{helpText}</div>}
        </div>

        <div className="relative h-[50px] border-[1px] border-white/10 rounded-[38px] w-full px-5 bg-input-bg/70 placeholder-white/40 outline-none cursor-default focus:border-red23 focus:read-only:border-white/10">
          <button 
            ref={handlerRef}
            type="button"
            className={`flex items-center justify-between gap-3  px-5 absolute left-0 bottom-0 top-0 bg-gray-100 rounded-[38px] hover:bg-gray-100-hover min-w-[158px] ${
              open ? "z-10" : ""
            }`}
            onClick={() => setOpen(!open)}
          >
            <span className="flex items-center gap-3">
              {selectedOption && <selectedOption.Icon />}
              {selectedOption?.value}
            </span>

            <ArrowDownIcon className="text-white" />
          </button>

          {append && (
            <div className="absolute left-[170px] right-6 top-0 bottom-0 flex items-center justify-end">
              <span className="inline-block text-ellipsis overflow-hidden whitespace-nowrap">{append}</span>
            </div>
          )}

          {open && (
            <DropdownList
              title={dropdownTitle}
              options={options}
              onSelect={handleSelect}
              ref={dropdownRef}
            />
          )}
        </div>
      </div>
    );
  }
);

const DropdownList = forwardRef(({ options, title, onSelect }, ref) => {
  return (
    <div ref={ref} className="absolute left-0 right-0 top-[110%] bg-gray-100 rounded-2xl  pt-2 z-10">
      <header className="px-5 pt-2 pb-4 text-sm font-medium">
        {title && <h4>{title}</h4>}
      </header>
      <ul className="max-h-[300px] overflow-auto">
        {options.map((o, idx) => {
          return (
            <li
              className="flex gap-3 items-center hover:bg-gray-100-hover px-5 py-2 last-of-type:rounded-b-2xl cursor-pointer"
              onClick={() => onSelect(o.value)}
            >
              <span className="flex w-[24px] items-center justify-center">
                {o.Icon && <o.Icon className="max-w-[24px]" />}
              </span>
              {o.value}
            </li>
          );
        })}
      </ul>
    </div>
  );
});

// react-hook-form wrapper for text field
export const DropdownFieldController = ({
  control,
  name,
  label,
  className,
  ...rest
}) => {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const hasError = Boolean(error?.message);

  return (
    <DropdownField
      hasError={hasError}
      label={label}
      value={value}
      name={name}
      onChange={onChange}
      onBlur={onBlur}
      error={error}
      className={className}
      ref={ref}
      {...rest}
    />
  );
};
