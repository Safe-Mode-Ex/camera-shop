function FilmCameraLoader({size = 160, color = 'currentColor', speed = '2s'}) {
  return (
    <div className="loader" style={{display: 'inline-block', width: size, height: size}}>
      <svg
        viewBox="11 4 90 90"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid slice"
        fill={color}
        xmlns="http://www.w3.org/2000/svg"
      >
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            .reel-left {
              animation: spin ${speed} linear infinite;
              transform-origin: 32px 30px;
            }
            .reel-right {
              animation: spin ${speed} linear infinite;
              transform-origin: 68px 30px;
            }
          `}
        </style>

        {/* Левая бобина (пленка) */}
        <g className="reel-left">
          <circle cx="32" cy="30" r="18" stroke={color} strokeWidth="2" fill="none" />
          <circle cx="32" cy="18" r="3" />
          <circle cx="32" cy="42" r="3" />
          <circle cx="20" cy="30" r="3" />
          <circle cx="44" cy="30" r="3" />
          <circle cx="32" cy="30" r="4" />
        </g>

        {/* Правая бобина (пленка) */}
        <g className="reel-right">
          <circle cx="68" cy="30" r="18" stroke={color} strokeWidth="2" fill="none" />
          <circle cx="68" cy="18" r="3" />
          <circle cx="68" cy="42" r="3" />
          <circle cx="56" cy="30" r="3" />
          <circle cx="80" cy="30" r="3" />
          <circle cx="68" cy="30" r="4" />
        </g>

        {/* Тело классической камеры */}
        <path d="M 20,50 L 80,50 A 5,5 0 0 1 85,55 L 85,80 A 5,5 0 0 1 80,85 L 20,85 A 5,5 0 0 1 15,80 L 15,55 A 5,5 0 0 1 20,50 Z" />

        {/* Объектив (рупор / конус справа) */}
        <path d="M 84,60 L 98,52 L 98,83 L 84,75 Z" />
      </svg>
    </div>
  );
}

export default FilmCameraLoader;
