/** Ornate mosque/domed building SVG used for ceremony venue cards. */
export default function MosqueIcon() {
  return (
    <svg viewBox="0 0 100 100" style={{ width: 60, height: 60, margin: '0 auto 1.5rem' }} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="primaryGold" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#A17E36" />
          <stop offset="50%" stopColor="#D9B462" />
          <stop offset="100%" stopColor="#F2D78C" />
        </linearGradient>
        <linearGradient id="domeShade" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFEBB3" />
          <stop offset="40%" stopColor="#D9B462" />
          <stop offset="100%" stopColor="#8C6B2D" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="32" fill="none" stroke="url(#primaryGold)" strokeWidth="0.75" opacity="0.4" />
      <g stroke="url(#primaryGold)" strokeWidth="0.3" opacity="0.25">
        <line x1="50" y1="18" x2="50" y2="82" />
        <line x1="18" y1="50" x2="82" y2="50" />
        <line x1="27" y1="27" x2="73" y2="73" />
        <line x1="27" y1="73" x2="73" y2="27" />
      </g>
      <path d="M26,80 V60 H38 V50 H62 V60 H74 V80 Z" fill="#FBF8F0" stroke="#8C6B2D" strokeWidth="0.8" />
      <rect x="38" y="52" width="24" height="28" fill="#F7F2E2" stroke="#8C6B2D" strokeWidth="1" />
      <path d="M42,80 V60 A8,8 0 0,1 58,60 V80" fill="none" stroke="url(#primaryGold)" strokeWidth="1.5" />
      <path d="M45,80 V64 A5,5 0 0,1 55,64 V80" fill="#203346" stroke="#8C6B2D" strokeWidth="0.8" />
      <g fill="#203346" stroke="#8C6B2D" strokeWidth="0.6">
        <path d="M29,74 V66 A2,2 0 0,1 33,66 V74 Z" />
        <path d="M67,74 V66 A2,2 0 0,1 71,66 V74 Z" />
      </g>
      <rect x="40" y="44" width="20" height="8" fill="#E6DCC3" stroke="#8C6B2D" strokeWidth="0.8" />
      <path d="M42,44 V48 M46,44 V48 M50,44 V48 M54,44 V48 M58,44 V48" stroke="#8C6B2D" strokeWidth="0.5" />
      <path d="M40,44 C38,40 41,24 50,24 C59,24 62,40 60,44 Z" fill="url(#domeShade)" stroke="#8C6B2D" strokeWidth="1" />
      <line x1="50" y1="24" x2="50" y2="17" stroke="url(#primaryGold)" strokeWidth="1" />
      <path d="M48.5,17 A3,3 0 1,1 52.5,19 A2.5,2.5 0 1,0 48.5,17 Z" fill="url(#primaryGold)" />
      <g>
        <rect x="20" y="50" width="4" height="30" fill="#F7F2E2" stroke="#8C6B2D" strokeWidth="0.8" />
        <rect x="19" y="77" width="6" height="3" fill="url(#primaryGold)" stroke="#8C6B2D" strokeWidth="0.6" />
        <path d="M18,50 H26 L24,46 H22 Z" fill="url(#primaryGold)" stroke="#8C6B2D" strokeWidth="0.8" />
        <rect x="21" y="34" width="2" height="12" fill="#F7F2E2" stroke="#8C6B2D" strokeWidth="0.6" />
        <path d="M20,34 L22,23 L24,34 Z" fill="url(#domeShade)" stroke="#8C6B2D" strokeWidth="0.8" />
        <line x1="22" y1="23" x2="22" y2="19" stroke="url(#primaryGold)" strokeWidth="0.6" />
      </g>
      <g>
        <rect x="76" y="50" width="4" height="30" fill="#F7F2E2" stroke="#8C6B2D" strokeWidth="0.8" />
        <rect x="75" y="77" width="6" height="3" fill="url(#primaryGold)" stroke="#8C6B2D" strokeWidth="0.6" />
        <path d="M74,50 H82 L80,46 H78 Z" fill="url(#primaryGold)" stroke="#8C6B2D" strokeWidth="0.8" />
        <rect x="77" y="34" width="2" height="12" fill="#F7F2E2" stroke="#8C6B2D" strokeWidth="0.6" />
        <path d="M76,34 L78,23 L80,34 Z" fill="url(#domeShade)" stroke="#8C6B2D" strokeWidth="0.8" />
        <line x1="78" y1="23" x2="78" y2="19" stroke="url(#primaryGold)" strokeWidth="0.6" />
      </g>
      <path d="M26,60 H38 M62,60 H74" stroke="#8C6B2D" strokeWidth="0.8" />
      <path d="M27,58 H29 V60 H27 Z M31,58 H33 V60 H31 Z M35,58 H37 V60 H35 Z M63,58 H65 V60 H63 Z M67,58 H69 V60 H67 Z M71,58 H73 V60 H71 Z" fill="url(#primaryGold)" stroke="#8C6B2D" strokeWidth="0.4" />
      <rect x="14" y="80" width="72" height="3" fill="#E6DCC3" stroke="#8C6B2D" strokeWidth="0.8" />
      <rect x="32" y="83" width="36" height="3" fill="url(#primaryGold)" stroke="#8C6B2D" strokeWidth="0.8" />
      <path d="M15,35 L16,36 L15,37 L14,36 Z" fill="url(#primaryGold)" />
      <path d="M84,38 L85,39 L84,40 L83,39 Z" fill="url(#primaryGold)" />
    </svg>
  )
}
