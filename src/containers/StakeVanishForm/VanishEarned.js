import { InfoTooltip } from "../../components/InfoTooltip";
import { useTimer } from "react-timer-hook";
import { FormatNumber } from "../../components/FormatNumber";

export const VanishEarned = ({ amount, expiryTimestamp }) => {
  const amountInUSD = 3643.54;

  const { minutes, hours, days } = useTimer({ expiryTimestamp });

  return (
    <div className="bg-black-100 rounded-[19px] border-[1px] border-white/10 py-4 pl-[25px] pr-[25px] flex items-center justify-between max-sm:flex-col">
      <div className="max-sm:text-center">
        <div className="mb-1 text-sm text-white/60">
          $VANISH earned
          <InfoTooltip text="Vanish rewards available" className="ml-[6px]" />
        </div>
        <div>
          <FormatNumber value={amount} className="font-bold text-[18px]" />{" "}
          <FormatNumber
            value={amountInUSD}
            prefix="~$"
            className="ml-[2px] text-sm text-white/60"
          />
        </div>
      </div>

      <div className="px-[20px] h-[42px] text-sm flex items-center rounded-[100px] bg-grey font-bold text-[#8E959E] max-sm:mt-3">
        {days}d {hours}h {minutes}m
      </div>
    </div>
  );
};
