/** Decorative floating lanterns for the hero. */
export default function Lanterns() {
  const lanterns = [
    { left: '8%', top: '15%', delay: 0 },
    { left: '15%', top: '55%', delay: 1.5, scale: 0.8 },
    { right: '10%', top: '20%', delay: 0.8 },
    { right: '18%', top: '60%', delay: 2.2, scale: 0.7 },
    { left: '5%', top: '75%', delay: 3, scale: 0.6 },
    { right: '5%', top: '80%', delay: 1, scale: 0.65 },
    { left: '50%', top: '8%', delay: 2.5, scale: 0.5, ml: -20 },
    { left: '35%', top: '70%', delay: 4, scale: 0.55 }
  ]
  return (
    <>
      {lanterns.map((l, i) => (
        <div
          key={i}
          className="lantern"
          style={{
            left: l.left, right: l.right, top: l.top, animationDelay: `${l.delay}s`,
            transform: l.scale ? `scale(${l.scale})` : undefined,
            marginLeft: l.ml ? `${l.ml}px` : undefined
          }}
        >
          <div className="lantern-glow" />
          <div className="lantern-body" />
        </div>
      ))}
    </>
  )
}
