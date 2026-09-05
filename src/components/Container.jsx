/**
 * Nested flex containers only — maps 1:1 to Elementor Containers
 * (ElementsKit header/footer + free container layout, no Atomic widgets).
 */
export function Container({
  as: Tag = 'div',
  boxed = true,
  direction = 'column',
  className = '',
  innerClassName = '',
  children,
  ...rest
}) {
  return (
    <Tag
      className={`e-con e-con--${direction} ${boxed ? 'e-con--boxed' : 'e-con--full'} ${className}`.trim()}
      {...rest}
    >
      <div className={`e-con-inner e-con-inner--${direction} ${innerClassName}`.trim()}>
        {children}
      </div>
    </Tag>
  )
}

export function Inner({ direction = 'row', className = '', children, ...rest }) {
  return (
    <div className={`e-con e-con--nested e-con--${direction} ${className}`.trim()} {...rest}>
      {children}
    </div>
  )
}

export function Column({ className = '', children, ...rest }) {
  return (
    <div className={`e-con e-con--nested e-con--column ${className}`.trim()} {...rest}>
      {children}
    </div>
  )
}
