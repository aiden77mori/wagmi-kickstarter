import { forwardRef } from "react";
import { useController } from "react-hook-form";
import { InfoTooltip } from "./InfoTooltip";
import { NumericFormat } from "react-number-format";

export const TextField = forwardRef(
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
      prepend,
      prependClassName,
      type,
      ...rest
    },
    ref
  ) => {
    const InputComponent = type === "number" ? NumericFormat : "input";
    const additionalInputProps =
      type === "number"
        ? {
            decimalSeparator: ".",
            thousandSeparator: ",",
          }
        : {};

    return (
      <div {...rest}>
        <div className="flex justify-between items-center mb-[8px] text-white/50 capitalize">
          {label && (
            <label className="mr-4">
              {label}
              {infoTooltip && (
                <InfoTooltip text={infoTooltip} className="ml-3" />
              )}
            </label>
          )}

          {helpText && <div className="text-white text-right">{helpText}</div>}
        </div>

        <div className="relative">
          {prepend && (
            <div
              className={`absolute left-[33px] top-0 bottom-0 flex items-center text-white/60 text-base h-[24px] border-r-[1px] border-white/10 my-auto pr-[12px] ${prependClassName}`}
            >
              {prepend}
            </div>
          )}
          <InputComponent
            value={value}
            onChange={(...values) => {
              console.log("values", values);
              onChange(...values);
            }}
            onBlur={onBlur}
            name={name}
            placeholder={placeholder}
            readOnly={readOnly}
            {...additionalInputProps}
            {...inputProps}
            className={`h-[50px] border-[1px] border-white/10 rounded-[38px] w-full px-5 bg-input-bg/70 placeholder-white/40 outline-none cursor-default focus:border-red23 focus:read-only:border-white/10 ${
              inputProps?.className || ""
            }`}
          />
          {append && (
            <div className="absolute right-6 top-0 bottom-0 flex items-center">
              {append}
            </div>
          )}
        </div>
        {hasError && (
          <span className="text-red pl-6 mt-1 flex">{error.message}</span>
        )}
      </div>
    );
  }
);

// react-hook-form wrapper for text field
export const TextFieldController = ({
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
    <TextField
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
