import cx from 'classnames';

export const Button = ({ children, color, className, size = 'large', ...rest }) => {

  const colorClasses = {
    primary: 'text-white bg-button-primary text-white hover:bg-button-primary-hover',
    'secondary-outlined': 'border-[1px] border-white/10 rounded-[38px] px-3 bg-input-bg/70 text-white/60 hover:text-white hover:border-red hover:shadow-[0_0_32px_rgba(254,32,31,1)] hover:bg-input-bg',
  }

  const sizes = {
    large: 'h-[3rem] font-bold',
    medium: 'h-[2.5rem] font-normal',
  }

  return (
    <button type="button" {...rest} className={cx('rounded-[27.5px] uppercase tracking-button', className, colorClasses[color], sizes[size])}>
      {children}
    </button>
  )
}