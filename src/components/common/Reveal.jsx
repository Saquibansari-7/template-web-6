import { useRef } from 'react'

/**
 * Reveal-on-scroll wrapper. The actual intersection logic lives in the global
 * observer (useGlobalReveal) which reveals any element with the .reveal class.
 * This component just applies the classes; pass `delay={1..5}` for stagger.
 */
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const ref = useRef(null)
  const cls = `reveal ${delay ? `reveal-delay-${delay}` : ''} ${className}`.trim()
  return (
    <Tag ref={ref} className={cls} {...rest}>
      {children}
    </Tag>
  )
}
