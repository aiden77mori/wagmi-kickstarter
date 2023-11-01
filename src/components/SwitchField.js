import { useController } from "react-hook-form";

export const SwitchField = ({ value, onChange, className, options }) => {
  return (
    <div
      className={`bg-black-100 rounded-[38px] border-[1px] border-white/10 p-1 flex items-center justify-center gap-2 w-full ${className}`}
    >
      {options.map((o, idx) => (
        <div  
          key={idx}
          onClick={() => onChange(o.value)}
          className={`w-full h-8 px-4  font-semibold text-sm flex items-center justify-center rounded-[25px] hover:text-white cursor-pointer ${value === o.value ? 'bg-grey text-white' : 'text-[#8E959E]'}`}
        >
          {o.title}
        </div>
      ))}
    </div>
  );
};

export const SwitchFieldController = ({
  control,
  name,
  label,
  className,
  options,
  ...rest
}) => {
  const {
    field: { onChange, value },
  } = useController({
    name,
    control,
  });

  return (
    <SwitchField
      value={value}
      name={name}
      onChange={onChange}
      className={className}
      options={options}
      {...rest}
    />
  );
};
