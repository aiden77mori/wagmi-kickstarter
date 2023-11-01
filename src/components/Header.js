import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import logo from "../assets/images/logo.svg";
import { WalletIcon } from "./icons/WalletIcon";

export const Header = () => {
  const { address } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  return (
    <header className="relative pl-[4.5rem] pr-[5.66rem] flex items-center justify-between pt-[2.06rem] max-md:pl-8 max-md:pr-8 max-sm:px-3">
      <a href="/">
        <img
          src={logo}
          width={110}
          height={106.291428}
          alt="Logo"
          className="max-sm:w-[100px]"
        />
      </a>

      {!address ? (
        <button
          onClick={() => connect()}
          className="text-red h-[48px] max-sm:h-[48px] px-[20px] max-sm:px-4 border-[1px] border-red-100 flex items-center justify-center bg-red09 hover:bg-red23 rounded-[27px]"
        >
          <WalletIcon className="mr-3" />
          Connect wallet
        </button>
      ) : (
        <button
          onClick={() => disconnect()}
          className="text-red h-[48px] max-sm:h-[48px] px-[20px] max-sm:px-4 border-[1px] border-red-100 flex items-center justify-center bg-red09 hover:bg-red23 rounded-[27px]"
        >
          <WalletIcon className="mr-3" />
          Disconnect
        </button>
      )}
    </header>
  );
};
