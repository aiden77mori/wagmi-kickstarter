import * as yup from "yup";
import { useForm } from "react-hook-form";
import {
  Divider,
  FormContainerUI,
  FormTitle,
} from "../components/FormContainerUI";
import { TextField, TextFieldController } from "../components/TextField";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMemo } from "react";
import {
  TOKEN,
  TOKEN_NAME,
  RECEPIENT_WALLET_ADDRESS_MAX_LENGTH,
  RECEPIENT_WALLET_ADDRESS_MIN_LENGTH,
} from "../constants";
import { Button } from "../components/Button";
import { DropdownFieldController } from "../components/DropdownField";
import { tokensOptions } from "../constants/tokens";
import { isWalletValid } from "../utils/isWalletValid";
import { FormatNumber } from "../components/FormatNumber";

export const SendTransferForm = () => {
  const available = 333;


  const schema = useMemo(() => {
    return yup.object({
      recepientWallet: yup
        .string()
        .min(
          RECEPIENT_WALLET_ADDRESS_MIN_LENGTH,
          "Recipient Wallet Address is too short"
        )
        .test("wallet-validate", "Wallet address is invalid", (wallet) =>
          isWalletValid(wallet)
        )
        .max(
          RECEPIENT_WALLET_ADDRESS_MAX_LENGTH,
          `Recipient Wallet Address is too long`
        )
        .required("Recipient Wallet Address  is missing"),
      amount: yup
        .number()
        .typeError("This field is required")
        .min(0.00001, "Amount should be bigger than 0.00001")
        .max(available, `Amount should not be bigger than ${available}`)
        .required("This field is required"),
    });
  }, []);

  const {
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    watch,
    control,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      recepientWallet: "",
      amount: "",
      sourceToken: TOKEN.ETH,
      destinationToken: TOKEN.ETH,
    },
  });

  const sendTransfer = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
  };

  const pButtons = [25, 50, 75, 100];

  const handleAmountButtonClick = (percentage) => () => {
    let amount = ((available || 0) * percentage) / 100;
    amount = parseFloat(amount.toFixed(12)); // TODO: not sure how many decimals should there be
    setValue("amount", amount, { shouldValidate: true });
  };

  const sourceToken = watch("sourceToken");
  const destinationToken = watch("destinationToken");

  return (
    <FormContainerUI title="You Send">
      <form
        onSubmit={handleSubmit(sendTransfer)}
        autoComplete="off"
        className="flex flex-col gap-[20px]"
      >
        <DropdownFieldController
          label="Select source currency"
          name="sourceToken"
          append={
            <span className="text-white/60">
              {TOKEN_NAME[sourceToken]} ({sourceToken})
            </span>
          }
          control={control}
          options={tokensOptions}
          dropdownTitle="Select a Token"
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
          type="number"
          inputProps={{
            className: "pr-[80px]",
            isAllowed: (values) => {
              const { floatValue } = values;
              console.log("floatValue", floatValue);
              return !floatValue || floatValue <= available;
            },
          }}
          append={
            <button
              type="button"
              onClick={handleAmountButtonClick(100)}
              className="text-red font-medium text-sm tracking-button"
            >
              MAX
            </button>
          }
        />

        <div className="flex justify-between gap-3">
          {pButtons.map((b, idx) => (
            <Button
              key={idx}
              color="secondary-outlined"
              size="medium"
              className="w-full"
              onClick={handleAmountButtonClick(b)}
            >
              {b}%
            </Button>
          ))}
        </div>

        <Divider />

        <FormTitle>You Get</FormTitle>

        <DropdownFieldController
          label="Destination currency"
          name="destinationToken"
          append={
            <span className="text-white/60">
              {TOKEN_NAME[destinationToken]} ({destinationToken})
            </span>
          }
          control={control}
          options={tokensOptions}
          dropdownTitle="Select a Token"
        />

        <TextFieldController
          label="Recipient Wallet Address"
          placeholder="Enter wallet address"
          name="recepientWallet"
          control={control}
        />

        <TextField
          label="FEE"
          placeholder="Total"
          name="recepientWallet"
          helpText="0.002 ETH"
          infoTooltip={(
            <>
              <div><span className="text-red font-bold">2%</span> - standard fee <span className="text-red">(current)</span></div>
              <div><span className="text-red font-bold">0%</span> - available for NFT holders</div>
            </>
          )}
          readOnly
          inputProps={{
            className: "placeholder-white/60",
          }}
          append={<span className="text-white text-base">0.098 ETH</span>}
        />

        <Button color="primary" type="submit" disabled={isSubmitting}>
          Transfer Now {isSubmitting && "..."}
        </Button>
      </form>
    </FormContainerUI>
  );
};
