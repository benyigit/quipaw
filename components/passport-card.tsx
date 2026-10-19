import type { Ref } from "react";

export const passportThemes = [
  { id: "sunshine", name: "Sunshine", portrait: "#ffe193", background: "#dff1e9", badge: "#ff8068" },
  { id: "mint", name: "Mint", portrait: "#bae4d3", background: "#e7f5ec", badge: "#328d77" },
  { id: "peach", name: "Peach", portrait: "#ffd0b9", background: "#fff0e5", badge: "#d46d50" },
  { id: "lilac", name: "Lilac", portrait: "#dfd2f0", background: "#eeeaf6", badge: "#8266a6" },
] as const;
export const passportBadges = ["GOOD DOG", "BEST FRIEND", "TREAT EXPERT"];
export const photoFramings = [
  { label: "Top left", value: "xMinYMin" }, { label: "Top", value: "xMidYMin" }, { label: "Top right", value: "xMaxYMin" },
  { label: "Left", value: "xMinYMid" }, { label: "Centre", value: "xMidYMid" }, { label: "Right", value: "xMaxYMid" },
  { label: "Bottom left", value: "xMinYMax" }, { label: "Bottom", value: "xMidYMax" }, { label: "Bottom right", value: "xMaxYMax" },
];
export const passportAvatars = ["🐶", "🐕", "🐩", "🦮"];

function fittedTextSize(value: string, maximum: number) {
  const width = Array.from(value).reduce((sum, letter) => sum + (/[MWmw]/.test(letter) ? 1 : /[iljtI.,!\s]/.test(letter) ? .35 : /[^\x00-\x7F]/.test(letter) ? 1.1 : /[A-Z]/.test(letter) ? .8 : .65), 0);
  return Math.min(maximum, 320 / Math.max(width, 1));
}

export function PassportCard({ svgRef, name, avatar, mood, icon, theme, badge, note, photo, zoom, framing }: {
  svgRef: Ref<SVGSVGElement>; name: string; avatar: number; mood: string; icon: string;
  theme: number; badge: number; note: string; photo: string; zoom: number; framing: number;
}) {
  const colors = passportThemes[theme];
  const displayName = name.trim() || "Your best friend";
  const nameSize = fittedTextSize(displayName, 33);
  const badgeWords = passportBadges[badge].split(" ");
  const caption = note.trim();
  return <svg ref={svgRef} xmlns="http://www.w3.org/2000/svg" width="460" height="600" viewBox="0 0 460 600" role="img" aria-label={`${displayName}’s Quipaw paw passport`}>
    <defs>
      <filter id="passport-shadow" x="-30%" y="-30%" width="160%" height="170%"><feDropShadow dx="0" dy="13" stdDeviation="12" floodColor="#254f3c" floodOpacity=".12" /></filter>
      <clipPath id="passport-portrait-clip"><circle cx="230" cy="210" r="70" /></clipPath>
    </defs>
    <rect width="460" height="600" rx="28" fill={colors.background} />
    <g transform="rotate(-3 230 300)" fontFamily="Arial, sans-serif" fill="#153851">
      <rect x="30" y="30" width="400" height="530" rx="26" fill="#fffdf5" filter="url(#passport-shadow)" />
      <text x="58" y="86" fill="#2e987c" fontWeight="700" fontSize="27">Quipaw.</text>
      <text x="402" y="82" textAnchor="end" fontSize="9" letterSpacing="1.3" fontWeight="700">PAW PASSPORT</text>
      <circle cx="230" cy="210" r="76" fill="white" />
      <circle cx="230" cy="210" r="70" fill={colors.portrait} />
      {photo ? <g clipPath="url(#passport-portrait-clip)"><image href={photo} x={230 - 70 * zoom} y={210 - 70 * zoom} width={140 * zoom} height={140 * zoom} preserveAspectRatio={`${photoFramings[framing].value} slice`} /></g> : <text x="230" y="236" textAnchor="middle" fontSize="78" fontFamily="Apple Color Emoji, Segoe UI Emoji, Noto Color Emoji, sans-serif">{passportAvatars[avatar]}</text>}
      <g transform="rotate(13 303 264)"><circle cx="303" cy="264" r="30" fill={colors.badge} stroke="white" strokeWidth="3" /><text x="303" y="261" fill="white" fontSize="9.5" fontWeight="700" textAnchor="middle"><tspan x="303">{badgeWords[0]}</tspan><tspan x="303" dy="12">{badgeWords[1]}</tspan></text></g>
      <text x="230" y="334" textAnchor="middle" fontSize={nameSize} fontWeight="700" letterSpacing="-.8">{displayName}</text>
      <text x="230" y="372" textAnchor="middle" fontFamily="Georgia, serif" fontStyle="italic" fontSize="22" fill="#2e806f">{mood}</text>
      {caption && <text x="230" y="398" textAnchor="middle" fontSize={fittedTextSize(caption, 12)} fill="#617a6c">{caption}</text>}
      <path d="M58 418H402 M58 506H402" fill="none" stroke="#bdcfbf" strokeDasharray="3 3" />
      <text x="155" y="476" textAnchor="middle" fill="#2e987c" fontSize="40">{icon}</text>
      <text x="190" y="452" fontSize="12"><tspan x="190" dy="6">Member of the</tspan><tspan x="190" dy="19" fontWeight="700">happy tails club</tspan></text>
      <text x="58" y="535" fontWeight="700" fontSize="9">100% personality</text>
      <text x="230" y="535" textAnchor="middle" fontSize="11">✦</text>
      <text x="402" y="535" textAnchor="end" fontWeight="700" fontSize="9">Endless tail wags</text>
    </g>
  </svg>;
}

export async function downloadPassport(svg: SVGSVGElement) {
  // The live SVG is the single source for both preview and exported artwork.
  const source = new XMLSerializer().serializeToString(svg);
  const url = URL.createObjectURL(new Blob([source], { type: "image/svg+xml;charset=utf-8" }));
  try {
    const image = new Image(); image.src = url; await image.decode();
    const canvas = document.createElement("canvas"); canvas.width = 1380; canvas.height = 1800;
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Canvas unavailable");
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob>((resolve, reject) => canvas.toBlob((value) => value ? resolve(value) : reject(new Error("Export failed")), "image/png"));
    const downloadUrl = URL.createObjectURL(blob);
    const anchor = document.createElement("a"); anchor.download = "quipaw-paw-passport.png"; anchor.href = downloadUrl; anchor.click();
    setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
  } finally { URL.revokeObjectURL(url); }
}

export async function preparePortrait(file: File) {
  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type) || file.size > 8 * 1024 * 1024) throw new Error("Choose a JPG, PNG or WebP photo under 8 MB.");
  const url = URL.createObjectURL(file);
  try {
    const image = new Image(); image.src = url; await image.decode();
    const canvas = document.createElement("canvas");
    const scale = Math.min(1, 800 / Math.max(image.naturalWidth, image.naturalHeight));
    canvas.width = Math.max(1, Math.round(image.naturalWidth * scale)); canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
    const context = canvas.getContext("2d");
    if (!context) throw new Error("We couldn’t read that photo. Please try another one.");
    context.fillStyle = "#fffdf5"; context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/jpeg", .82);
  } finally { URL.revokeObjectURL(url); }
}
