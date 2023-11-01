import { FormatNumber } from "../../components/FormatNumber";

export const StakeInfo = ({ amount, apr }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-[23px]">
      <Item title="APR">Up to {apr}%</Item>
      <Item title="Total Staked">
        <FormatNumber value={amount} />
      </Item>
    </div>
  );
};

const Item = ({ title, children }) => {
  return (
    <div className="bg-black-100 rounded-[19px] border-[1px] border-white/10 py-[11px] px-4 flex flex-col items-center justify-center gap-1 w-full ">
      <h4 className="font-sm text-white/60">{title}</h4>
      <div className="font-bold text-base leading-[24px]">{children}</div>
    </div>
  );
};
