import { NumericFormat } from "react-number-format"

export const FormatNumber = ({ value, className, ...rest }) => {
  return <NumericFormat
  displayType="text"
  value={value}
  decimalSeparator="."
  thousandSeparator=","
  className={className}
  {...rest}
/>
}