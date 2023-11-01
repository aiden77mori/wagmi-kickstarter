import { FooterNav } from "./FooterNav";
import { SocialLinks } from "./SocialLinks";

import "./footer.css";

export const Footer = () => {
  return (
    <footer className="footer pb-[20px]">
      <div className="px-3 max-w-[1345px] w-full flex gap-6 justify-between items-center mx-auto pt-[12.72px] pb-[22.91px]">
        <div className="w-1/4 h-1 max-lg:hidden" > </div>
        <div className="w-1/2">
          <FooterNav />
        </div>
        <div className="w-1/4 flex justify-end">
          <SocialLinks />
        </div>
      </div>
    </footer>
  );
};
