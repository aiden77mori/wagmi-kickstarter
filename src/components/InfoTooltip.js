import { Tooltip } from "react-tooltip";
import { InfoIcon } from "./icons/InfoIcon";
import { useId } from "react";

export const InfoTooltip = ({ text, className, ...rest }) => {
  const id = useId();

  return (
    <span
      className={`w-5 h-5 rounded-full bg-grey text-white/60 hover:text-white inline-flex items-center justify-center ${
        className || ""
      }`}
      data-tooltip-id={id}
      // data-tooltip-content={}
      {...rest}
    >
      <InfoIcon />
      <Tooltip id={id}>{text}</Tooltip>
    </span>
  );
};
