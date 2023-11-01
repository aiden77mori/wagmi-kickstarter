export const FooterNav = () => {
  const links = [
    { title: 'Features', href: '' },
    { title: 'Ecosystem', href: '' },
    { title: 'Roadmap', href: '' },
    { title: 'Partners', href: '' },
  ]

  return (
    <nav>
      <ul className="flex justify-between items-center gap-[75px] text-base max-md:flex-col max-md:gap-3 max-md:items-start">
        {links.map((link, idx) => {
          return (
            <li key={idx}>
              <a href={link.href} title={link.title} className="text-[#ACB7D5] hover:text-white">{link.title}</a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}