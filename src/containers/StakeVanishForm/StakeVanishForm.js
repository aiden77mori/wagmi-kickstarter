import * as yup from "yup";
import { useForm } from "react-hook-form";
import { FormContainerUI } from "../../components/FormContainerUI";
import { TextFieldController } from "../../components/TextField";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMemo } from "react";
import { Button } from "../../components/Button";
import { VanishEarned } from "./VanishEarned";
import { StakeInfo } from "./StakeInfo";
import { SwitchFieldController } from "../../components/SwitchField";
import { FormatNumber } from "../../components/FormatNumber";

export const StakeVanishForm = () => {
  const available = 5000000;

  const schema = useMemo(() => {
    return yup.object({
      amount: yup
        .number()
        .typeError("This field is required")
        .min(0.00001, "Amount should be bigger than 0.00001")
        .max(available, `Amount should not be bigger than ${available}`)
        .required("This field is required"),
    });
  }, [available]);

  const {
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    watch,
    control,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      stake: true,
      amount: "",
    },
  });

  const stakeUnstake = async (values) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
  };

  const stake = watch("stake");

  const expiryTimestamp = useMemo(
    () => new Date(Date.now() + 200000000).getTime(),
    []
  );

  const handleAmountButtonClick = (percentage) => () => {
    let amount = ((available || 0) * percentage) / 100;
    amount = parseFloat(amount.toFixed(12)); // TODO: not sure how many decimals should there be
    setValue("amount", amount, { shouldValidate: true });
  };

  return (
    <FormContainerUI title="Stake Vanish">
      <form
        onSubmit={handleSubmit(stakeUnstake)}
        autoComplete="off"
        className="flex flex-col gap-[15px]"
      >
        <div className="mt-[25px]">
          <VanishEarned amount={1123176.64} expiryTimestamp={expiryTimestamp} />
        </div>

        <SwitchFieldController
          name="stake"
          control={control}
          options={[
            { value: true, title: "Stake" },
            { value: false, title: "Unstake" },
          ]}
        />

        <TextFieldController
          label="Enter Amount"
          helpText={
            <>
              <span className="text-white/50">Available:</span>{" "}
              {available ? <FormatNumber value={available} /> : "00"}
            </>
          }
          placeholder="Enter Amount"
          name="amount"
          control={control}
          inputProps={{
            className: "pr-[80px] pl-[125px] max-sm:px-5",
            isAllowed: (values) => {
              const { floatValue } = values;
              console.log("floatValue", floatValue);
              return !floatValue || floatValue <= available;
            },
          }}
          type="number"
          prepend="$VANISH"
          prependClassName="max-sm:hidden"
          append={
            <button
              type="button"
              onClick={handleAmountButtonClick(100)}
              className="text-red font-medium tracking-button"
            >
              MAX
            </button>
          }
        />

        <StakeInfo amount="1123176.64" apr="100" />

        <Button color="primary" disabled={isSubmitting} type="submit">
          {stake ? "Stake" : "Unstake"} {isSubmitting && "..."}
        </Button>
      </form>
    </FormContainerUI>
  );
};
