import { TelegramIcon } from "./icons/TelegramIcon";
import { TwitterIcon } from "./icons/TwitterIcon";
import { UnknownSoclialIcon } from "./icons/UnknownSocialIcon";

export const SocialLinks = () => {
  const links = [
    {
      title: "",
      href: "",
      Icon: TwitterIcon,
      iconClassName: 'absolute left-[12px] top-[13px]'
    },
    {
      title: "",
      href: "",
      Icon: TelegramIcon,
      iconClassName: 'absolute left-[10px] top-[13px]'
    },
    {
      title: "",
      href: "",
      Icon: UnknownSoclialIcon,
      iconClassName: 'absolute left-[12px] top-[9px]'
    },
  ];

  return (
    <ul className="flex  gap-[0.89rem]">
      {links.map((link, idx) => (
        <li key={idx}>
          <a
            href={link.href}
            title={link.title}
            className="relative text-white flex items-center justify-center border-[1px] border-red-100 rounded-[27px]  bg-red23 h-[2.8125rem] w-[2.625rem] hover:bg-red-100"
          >
            <link.Icon className={link.iconClassName} />
          </a>
        </li>
      ))}
    </ul>
  );
};
