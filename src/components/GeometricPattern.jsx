// Unique ID counter to avoid SVG pattern ID collisions
let patternCounter = 0
function usePatternId(prefix) {
  return `${prefix}_${++patternCounter}`
}

/*
 * Islamic 8-fold rosette tessellation based on traditional compass & straightedge
 * construction method (Mohamad Aljanabi / Michael Fares).
 *
 * The tile = one quarter mirrored 4×. Shapes: SUN (central 8-pt rosette),
 * 8 PETALs, 8 DARTs, 4 edge 5-pointed STARs, 4 corner OCTAGONs,
 * plus 2 interlacing pattern lines. All coordinates computed from side length s.
 */

// ── Construction constants (from compass & straightedge) ──
const s = 100 // side of the quarter-square (scaled from 400→100 for SVG pattern)
const diagonal = Math.sqrt(s * s * 2)
const r_arcB = diagonal - s        // arc B radius
const r_arcC = diagonal / 4        // arc C radius
const sqB = r_arcB / Math.sqrt(2)  // side of square inscribed in arc B
const sqC = r_arcC / Math.sqrt(2)  // side of square inscribed in arc C
const pH = s - sqC                 // petal height
const pCH = sqB + sqC              // petal corner height
const gap = r_arcB - r_arcC        // gap between arcs
const dH = sqC / Math.sqrt(6)      // dart height offset

// ── Shape coordinate builders (one quarter, then mirrored 4×) ──
const toPath = (pts) => pts.map(([x,y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(' ')

// The Sun: 16-sided rosette at tile centre (s,s)
const SUN_PTS = [
  [s-sqC, s-sqC], [s-dH, s-sqC], [s, s-r_arcC], [s+dH, s-sqC],
  [s+sqC, s-sqC], [s+sqC, s-dH], [s+r_arcC, s], [s+sqC, s+dH],
  [s+sqC, s+sqC], [s+dH, s+sqC], [s, s+r_arcC], [s-dH, s+sqC],
  [s-sqC, s+sqC], [s-sqC, s+dH], [s-r_arcC, s], [s-sqC, s-dH],
]

// Petal (×8 rotated around centre)
const PETAL_PTS = [
  [sqB, sqB], [pCH, sqC-gap], [pH, s-pCH-gap],
  [s-sqC, s-sqC], [s-pCH-gap, pH], [s-pH-gap, pCH], [sqB, sqB],
]

// Dart (×8 rotated around centre)
const DART_PTS = [
  [s-pCH-gap, pH], [s-sqC, s-sqC], [s-sqC, s-dH],
  [s-r_arcC, s], [s-pCH-gap, pH],
]

// Edge 5-pointed star (×4, one per edge midpoint)
const STAR_PTS = [
  [sqB, sqB], [r_arcB, 0], [s, 0], [pH, dH],
  [pH, s-pCH-gap], [pCH, sqC-gap], [sqB, sqB],
]

// Corner octagon (×4)
const OCTAGON_PTS = [
  [sqB, sqB], [0, r_arcB], [0, 0], [r_arcB, 0], [sqB, sqB],
]

// Interlacing pattern lines (define the weave)
const LINE1 = [
  [0, r_arcB], [pCH, sqC-gap], [s, s-r_arcC], [s-dH, s-sqC], [dH, pH], [0, s],
]
const LINE2 = [
  [r_arcB, 0], [s-pH-gap, pCH], [s-r_arcC, s], [s-sqC, s-dH], [pH, dH], [s, 0],
]

// Full tile = 4 mirrored quarters. Transform a quarter's shapes into full-tile paths.
const TILE = 2 * s // full tile size (200)
const H = s        // half = 100

// Mirror transforms for the 4 quarters
const transforms = [
  ([x,y]) => [x, y],                    // Q1: top-left (as-is)
  ([x,y]) => [TILE - x, y],             // Q2: top-right (flip X)
  ([x,y]) => [TILE - x, TILE - y],      // Q3: bottom-right (flip XY)
  ([x,y]) => [x, TILE - y],             // Q4: bottom-left (flip Y)
]

function mirrorPath(pts) {
  return transforms.map(tf => toPath(pts.map(tf)))
}

// Pre-compute all mirrored shape paths
const sunPath = toPath(SUN_PTS) // sun is already centred at (s,s), symmetric
const petalPaths = mirrorPath(PETAL_PTS)
const dartPaths = mirrorPath(DART_PTS)
const starPaths = mirrorPath(STAR_PTS)
const octagonPaths = mirrorPath(OCTAGON_PTS)
const linePaths1 = mirrorPath(LINE1)
const linePaths2 = mirrorPath(LINE2)

export default function GeometricPattern({ className = '', variant = 'default' }) {

  // ── Hero variant: gold on dark backgrounds ──
  if (variant === 'hero') {
    const id = usePatternId('hero')
    const g = 'rgba(212,168,75,'
    return (
      <svg className={`absolute inset-0 w-full h-full pointer-events-none ${className}`} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id={id} x="0" y="0" width={TILE} height={TILE} patternUnits="userSpaceOnUse">
            {/* Sun — central 8-fold rosette */}
            <polygon points={sunPath} fill={`${g}0.05)`} stroke={`${g}0.18)`} strokeWidth="0.7" strokeLinejoin="miter" />
            {/* Petals ×4 quarters */}
            {petalPaths.map((p,i) => <polygon key={`p${i}`} points={p} fill={`${g}0.03)`} stroke={`${g}0.14)`} strokeWidth="0.6" strokeLinejoin="miter" />)}
            {/* Darts ×4 quarters */}
            {dartPaths.map((p,i) => <polygon key={`d${i}`} points={p} fill={`${g}0.02)`} stroke={`${g}0.12)`} strokeWidth="0.5" strokeLinejoin="miter" />)}
            {/* Edge 5-pointed stars ×4 quarters */}
            {starPaths.map((p,i) => <polygon key={`s${i}`} points={p} fill={`${g}0.02)`} stroke={`${g}0.1)`} strokeWidth="0.5" strokeLinejoin="miter" />)}
            {/* Corner octagons ×4 quarters */}
            {octagonPaths.map((p,i) => <polygon key={`o${i}`} points={p} fill={`${g}0.015)`} stroke={`${g}0.08)`} strokeWidth="0.4" strokeLinejoin="miter" />)}
            {/* Interlacing pattern lines */}
            {linePaths1.map((p,i) => <polyline key={`l1${i}`} points={p} fill="none" stroke={`${g}0.1)`} strokeWidth="0.5" />)}
            {linePaths2.map((p,i) => <polyline key={`l2${i}`} points={p} fill="none" stroke={`${g}0.1)`} strokeWidth="0.5" />)}
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`} />
      </svg>
    )
  }

  // ── Border-top variant: zellige diamond frieze ──
  if (variant === 'border-top') {
    const id = usePatternId('border')
    const bStar = (cx, cy, ro, ri) => {
      const pts = []
      for (let i = 0; i < 16; i++) {
        const a = (Math.PI * 2 * i) / 16 - Math.PI / 2
        const r = i % 2 === 0 ? ro : ri
        pts.push(`${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`)
      }
      return pts.join(' ')
    }
    return (
      <svg className={`w-full h-6 ${className}`} viewBox="0 0 1200 24" preserveAspectRatio="none">
        <defs>
          <pattern id={id} x="0" y="0" width="48" height="24" patternUnits="userSpaceOnUse">
            <polygon points={bStar(24, 12, 9, 5)} fill="none" stroke="rgba(212,168,75,0.2)" strokeWidth="0.5" strokeLinejoin="miter" />
            <polygon points={bStar(24, 12, 5, 3)} fill="none" stroke="rgba(212,168,75,0.12)" strokeWidth="0.3" />
            {/* Edge connectors */}
            <line x1="15" y1="3" x2="24" y2="0" stroke="rgba(212,168,75,0.12)" strokeWidth="0.3" />
            <line x1="33" y1="3" x2="24" y2="0" stroke="rgba(212,168,75,0.12)" strokeWidth="0.3" />
            <line x1="15" y1="21" x2="24" y2="24" stroke="rgba(212,168,75,0.12)" strokeWidth="0.3" />
            <line x1="33" y1="21" x2="24" y2="24" stroke="rgba(212,168,75,0.12)" strokeWidth="0.3" />
            <line x1="15" y1="12" x2="0" y2="12" stroke="rgba(212,168,75,0.1)" strokeWidth="0.3" />
            <line x1="33" y1="12" x2="48" y2="12" stroke="rgba(212,168,75,0.1)" strokeWidth="0.3" />
            {/* Corner quarter-stars */}
            <polygon points={bStar(0, 0, 9, 5)} fill="none" stroke="rgba(212,168,75,0.08)" strokeWidth="0.3" />
            <polygon points={bStar(48, 0, 9, 5)} fill="none" stroke="rgba(212,168,75,0.08)" strokeWidth="0.3" />
            <polygon points={bStar(0, 24, 9, 5)} fill="none" stroke="rgba(212,168,75,0.08)" strokeWidth="0.3" />
            <polygon points={bStar(48, 24, 9, 5)} fill="none" stroke="rgba(212,168,75,0.08)" strokeWidth="0.3" />
            <circle cx="24" cy="12" r="1" fill="rgba(212,168,75,0.15)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`} />
      </svg>
    )
  }

  // ── Default variant: teal on light backgrounds ──
  const id = usePatternId('default')
  const t = 'rgba(10,107,107,'
  const g = 'rgba(212,168,75,'
  return (
    <svg className={`absolute inset-0 w-full h-full pointer-events-none ${className}`} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id={id} x="0" y="0" width={TILE} height={TILE} patternUnits="userSpaceOnUse">
          {/* Sun */}
          <polygon points={sunPath} fill={`${t}0.03)`} stroke={`${t}0.12)`} strokeWidth="0.6" strokeLinejoin="miter" />
          {/* Petals */}
          {petalPaths.map((p,i) => <polygon key={`p${i}`} points={p} fill={`${t}0.02)`} stroke={`${t}0.09)`} strokeWidth="0.5" strokeLinejoin="miter" />)}
          {/* Darts */}
          {dartPaths.map((p,i) => <polygon key={`d${i}`} points={p} fill={`${t}0.012)`} stroke={`${t}0.07)`} strokeWidth="0.4" strokeLinejoin="miter" />)}
          {/* Edge stars */}
          {starPaths.map((p,i) => <polygon key={`s${i}`} points={p} fill={`${t}0.012)`} stroke={`${t}0.06)`} strokeWidth="0.4" strokeLinejoin="miter" />)}
          {/* Corner octagons */}
          {octagonPaths.map((p,i) => <polygon key={`o${i}`} points={p} fill={`${t}0.008)`} stroke={`${t}0.05)`} strokeWidth="0.35" strokeLinejoin="miter" />)}
          {/* Interlacing lines */}
          {linePaths1.map((p,i) => <polyline key={`l1${i}`} points={p} fill="none" stroke={`${t}0.065)`} strokeWidth="0.4" />)}
          {linePaths2.map((p,i) => <polyline key={`l2${i}`} points={p} fill="none" stroke={`${t}0.065)`} strokeWidth="0.4" />)}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  )
}
