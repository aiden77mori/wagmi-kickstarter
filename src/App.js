import { WagmiConfig, createConfig, mainnet } from "wagmi";
import { createPublicClient, http } from 'viem'
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { SendTransferForm } from "./containers/SendTransferForm";
import { StakeVanishForm } from "./containers/StakeVanishForm/StakeVanishForm";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SendTransferForm />,
  },
  {
    path: "/stake",
    element: <StakeVanishForm />,
  },
]);

const config = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: mainnet,
    transport: http(),
  }),
});

function App() {
  return (
    <>
      <WagmiConfig config={config}>
        <Header />
        <div className="mb-[30px]" />
        <div className="my-auto">
          <RouterProvider router={router} />
          {/* <SendTransferForm /> */}
          {/* <StakeVanishForm /> */}
        </div>
        <div className="mb-[48px]" />
        <Footer />
      </WagmiConfig>
    </>
  );
}

export default App;
