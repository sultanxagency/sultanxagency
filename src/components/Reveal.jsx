import useInView from '../hooks/useInView.js'

/**
 * Wraps children in a fade + slide reveal that triggers once, on scroll-in.
 * `delay` is in milliseconds and is applied via inline transition-delay,
 * used sparingly to stagger a small group of related items (e.g. cards).
 */
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const [ref, inView] = useInView()

  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? 'in-view' : ''} ${className}`.trim()}
      style={{ transitionDelay: inView ? `${delay}ms` : '0ms' }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
