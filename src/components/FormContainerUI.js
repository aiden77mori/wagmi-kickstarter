import logo from '../assets/images/logo.svg';

export const FormContainerUI = ({ title, children }) => {
  return (
    <div className="bg-black border-[1px] border-red23 px-6 py-[1.335625rem] w-[500px] max-w-[calc(100%-24px)] mx-auto rounded-2xl max-sm:px-4 max-sm:py-4">
      <header className="flex items-center justify-between">
        {title && <FormTitle>{title}</FormTitle>}

        <img src={logo} width={53.439} height={51.637} alt="Logo" className="scale-90" />
      </header>

      {children}
    </div>
  )
}

export const FormTitle = ({ children, className = '' }) => {
  return (
    <h4 className={`text-xl font-chinese-rocks ${className}`}>{children}</h4>
  )
}

export const Divider = () => {
  return <div className="h-[1px] bg-divider w-full" />

}