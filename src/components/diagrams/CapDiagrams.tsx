// 帽子示意图（2026-11-06 照真帽照片描线重画，替换原来手画的简图）
// 只放 <svg> 里面的图形；外层 <svg> 的 viewBox / class / 无障碍标签留在各自组件里。

export const diagramWords = {
  en: { back: "back", brim: "brim", brimFront: "brim (front)" },
  es: { back: "atrás", brim: "visera", brimFront: "visera (delante)" },
  fr: { back: "arrière", brim: "visière", brimFront: "visière (avant)" },
  de: { back: "hinten", brim: "Schirm", brimFront: "Schirm (vorne)" },
} as const;
export type DiagramWords = (typeof diagramWords)["en"] | (typeof diagramWords)["es"] | (typeof diagramWords)["fr"] | (typeof diagramWords)["de"];

export function FivePanelSingleFront() {
  return (
    <>
      <path d="M49.1 30.5 C44.9 36.4 36.9 46.3 32.8 58.7 C28.8 71 25.9 95.9 24.7 104.7 C23.6 113.5 24.9 109.9 25.9 111.4 C26.9 112.8 30.1 108.7 30.7 113.5 C31.3 118.3 29.1 133.5 29.7 140 C30.4 146.5 31.5 150.2 34.5 152.6 C37.6 155 40.5 155 48.1 154.5 C55.7 154 69.3 150.6 80.3 149.5 C91.3 148.4 97.8 147 114.2 147.8 C130.5 148.7 166.4 154.3 178.6 154.8 C190.7 155.2 185 152.9 186.9 150.5 C188.8 148.1 189.8 146.8 190 140.5 C190.3 134.1 187.5 117.6 188.3 112.3 C189.2 107 194.3 113.5 195 108.7 C195.7 103.9 194 92.4 192.4 83.5 C190.8 74.5 189.2 63.9 185.2 54.8 C181.3 45.7 173.2 34.4 168.8 28.8 C164.4 23.3 163.7 24.1 159 21.7 C154.4 19.3 149.9 16.2 140.9 14.3 C131.9 12.3 116.4 9.6 104.9 10 C93.4 10.4 79.8 14.3 72 16.4 C64.2 18.6 61.9 20.8 58.1 23.1 C54.3 25.5 53.3 24.6 49.1 30.5Z" fill="#f8fafc" stroke="#334155" strokeWidth="2.5"/><path d="M51.2 113 L50.5 63.4 Q110.6 33.6 170.9 63.4 L171.2 113 Q110.6 110.6 51.2 113Z" fill="#ccfbf1" stroke="#0f766e" strokeWidth="2"/><path d="M50.5 63.4 Q51.5 39.6 61.2 21 M170.9 63.4 Q169.7 39.6 160.2 21" stroke="#334155" strokeWidth="1.5"/><path d="M110.8 13.8 L110.8 46.7" stroke="#334155" strokeWidth="1" strokeDasharray="2 2"/><path d="M33.3 114 Q110.6 109.2 188.8 114" stroke="#334155" strokeWidth="2"/><path d="M41.4 123 Q110.6 118.3 180.5 123" stroke="#334155" strokeWidth="1" strokeDasharray="3 2.5"/><rect x="76.7" y="75.3" width="66.8" height="25" rx="3" stroke="#0f766e" strokeWidth="1.8" strokeDasharray="4 3"/><path d="M86.3 87.7 H135.2" stroke="#0f766e" strokeWidth="3"/>
    </>
  );
}

export function FivePanelCentreSeam() {
  return (
    <>
      <path d="M57.7 34.4 C53.1 39.6 49.8 45.2 47.1 52.9 C44.4 60.7 42.4 72.7 41.3 80.8 C40.1 88.8 39.8 97.3 40.2 101.3 C40.6 105.2 43.1 99.2 43.6 104.5 C44.2 109.9 42.7 126.3 43.4 133.4 C44.2 140.6 46.6 144.6 48.2 147.4 C49.8 150.3 49.5 149.7 53.1 150.7 C56.8 151.7 58.9 152.8 70.2 153.5 C81.4 154.2 106.3 154.9 120.7 154.8 C135.1 154.6 149 153.4 156.7 152.6 C164.4 151.9 164.4 151.4 167.1 150.3 C169.7 149.1 170.9 149.1 172.5 145.7 C174 142.3 175.8 136.8 176.4 129.8 C176.9 122.7 175.4 108.4 175.9 103.6 C176.5 98.9 179 104.7 179.6 101.1 C180.1 97.4 180.5 90.1 179.2 81.6 C177.8 73.2 174.2 57.9 171.6 50.3 C169 42.8 166.2 40.1 163.6 36.3 C161.1 32.6 160.2 30.7 156.3 27.9 C152.4 25.1 146.6 21.7 140.1 19.5 C133.6 17.3 121.7 16.2 117.4 14.7 C113.2 13.3 116 11.4 114.4 10.6 C112.8 9.9 109.4 9.9 107.7 10 C106.1 10.1 105.3 10.3 104.5 11.1 C103.7 11.8 105.9 13.5 103 14.5 C100 15.5 91.6 15.9 86.8 17.1 C82 18.3 79.1 19 74.3 21.9 C69.4 24.7 62.2 29.2 57.7 34.4Z" fill="#f8fafc" stroke="#334155" strokeWidth="2.5"/><path d="M109.7 15.6 C82.1 20.4 60 50.1 54.4 98 M110.5 15.6 C138.2 20.4 160.2 50.1 165.8 98" stroke="#334155" strokeWidth="1.5"/><path d="M44.9 98 Q110.1 103.6 175.3 98" stroke="#334155" strokeWidth="2"/><path d="M50.1 108 Q110.1 114.9 170.1 108 M52.9 117.5 Q110.1 125.2 167.3 117.5" stroke="#334155" strokeWidth="1" strokeDasharray="3 2.5"/><rect x="79.9" y="58.8" width="60.4" height="23.7" rx="3" stroke="#0f766e" strokeWidth="1.8" strokeDasharray="4 3"/><path d="M88.5 70.6 H131.7" stroke="#0f766e" strokeWidth="3"/><path d="M110.1 14.7 L110.1 101.1" stroke="#b45309" strokeWidth="2.5" strokeDasharray="5 3"/><circle cx="110.1" cy="12.2" r="2.6" fill="#334155" stroke="none"/>
    </>
  );
}

export function FitHeadCircumference() {
  return (
    <>
      <path d="M120 14 C90 14 72 36 72 66 C72 88 76 104 84 116 C92 129 105 138 120 138 C135 138 148 129 156 116 C164 104 168 88 168 66 C168 36 150 14 120 14Z" fill="#f8fafc" stroke="#334155" strokeWidth="2.5"/><path d="M73 74 C64 72 62 82 64 92 C66 102 72 106 78 104 M167 74 C176 72 178 82 176 92 C174 102 168 106 162 104" fill="#f8fafc" stroke="#334155" strokeWidth="2.5"/><path d="M104 136 L102 158 M136 136 L138 158" stroke="#334155" strokeWidth="2.5"/><path d="M96 78 Q104 74 112 78 M128 78 Q136 74 144 78 M101 88 h6 M133 88 h6 M120 92 v14 M112 118 Q120 122 128 118" stroke="#334155" strokeWidth="1.6"/><path d="M71 62 Q120 50 169 62" stroke="#087f79" strokeWidth="1.8" strokeDasharray="4 3" opacity=".6"/><path d="M71 62 Q120 74 169 62" stroke="#087f79" strokeWidth="4"/><path d="M168 63 L196 63" stroke="#087f79" strokeWidth="1.2" strokeDasharray="2 2"/><text x="202" y="70" fill="#087f79" stroke="none" fontSize="20" fontWeight="700">A</text>
    </>
  );
}

export function FitInsideCircumference({ w }: { w: DiagramWords }) {
  return (
    <>
      <path d="M93.8 31 C160.8 29 202 49.8 202 82 C202 114.2 160.8 135 93.8 133" fill="#f8fafc" stroke="#334155" strokeWidth="2.5"/><path d="M93.8 38.2 C160.8 36.1 195.6 54.3 195.6 82 C195.6 109.7 160.8 127.9 93.8 125.8" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 2.5"/><path d="M93.8 44.3 C160.8 42.2 190 58.1 190 82 C190 105.9 160.8 121.8 93.8 119.7" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 2.5"/><ellipse cx="92" cy="82" rx="64" ry="52" fill="#fff" stroke="#334155" strokeWidth="2.5"/><ellipse cx="92" cy="82" rx="59.5" ry="47.5" stroke="#e2e8f0" strokeWidth="9"/><ellipse cx="92" cy="82" rx="55" ry="43" stroke="#334155" strokeWidth="1.2"/><path d="M92 82 L144.8 82" stroke="#94a3b8" strokeWidth="1.2"/><path d="M92 82 L118.4 117.7" stroke="#94a3b8" strokeWidth="1.2"/><path d="M92 82 L65.6 117.7" stroke="#94a3b8" strokeWidth="1.2"/><path d="M92 82 L39.2 82" stroke="#94a3b8" strokeWidth="1.2"/><path d="M92 82 L65.6 46.3" stroke="#94a3b8" strokeWidth="1.2"/><path d="M92 82 L118.4 46.3" stroke="#94a3b8" strokeWidth="1.2"/><circle cx="92" cy="82" r="3" fill="#334155" stroke="none"/><path d="M28 70 L28 94" stroke="#334155" strokeWidth="6"/><path d="M22 76 h12 M22 82 h12 M22 88 h12" stroke="#fff" strokeWidth="1.2"/><ellipse cx="92" cy="82" rx="55" ry="43" stroke="#087f79" strokeWidth="3" strokeDasharray="6 4"/><path d="M92 39 L92 26 L210 26" stroke="#087f79" strokeWidth="1.2" strokeDasharray="2 2"/><text x="214" y="33" fill="#087f79" stroke="none" fontSize="20" fontWeight="700">B</text><text x="30" y="150" fill="#334155" stroke="none" fontSize="9">{w.back}</text><text x="190" y="150" fill="#334155" stroke="none" fontSize="9">{w.brim}</text>
    </>
  );
}

export function FitCrownBrim() {
  return (
    <>
      <path d="M225.5 70.8 C223.1 63.1 216.3 52.7 212.8 47.5 C209.3 42.3 208.5 42.3 204.5 39.4 C200.5 36.5 194.9 32.6 188.8 29.8 C182.6 27.1 172.3 24.7 167.7 22.7 C163.1 20.8 163.2 18.7 161.1 18.1 C158.9 17.4 156 18.3 154.7 18.8 C153.3 19.3 157.5 20.3 153 21 C148.4 21.7 134.7 21.5 127.5 23 C120.3 24.4 115.5 26.6 109.8 29.6 C104.1 32.6 97.9 36.4 93.4 40.9 C88.9 45.4 86.8 48.5 82.6 56.6 C78.4 64.6 79 81.8 68.4 89.4 C57.8 97.1 27.6 99.5 18.9 102.4 C10.2 105.3 17.1 104.4 16.2 106.6 C15.2 108.7 13.9 112.7 13.2 115.4 C12.5 118.1 11.6 120.6 12 122.8 C12.4 124.9 13.3 126.3 15.4 128.1 C17.6 130 18.9 132.1 25 133.8 C31 135.5 36.8 138 51.7 138.4 C66.7 138.9 94.6 136.6 114.7 136.5 C134.8 136.4 157.7 138.1 172.3 138 C187 137.8 195.3 136.9 202.7 135.7 C210.2 134.6 213.9 132.8 217 131.3 C220.1 129.9 219.6 133.2 221.4 126.9 C223.1 120.7 226.8 103.2 227.5 93.8 C228.2 84.5 228 78.5 225.5 70.8Z" fill="#f8fafc" stroke="#334155" strokeWidth="2.5"/><path d="M71.6 96.8 Q88.2 122.8 129.9 136" stroke="#334155" strokeWidth="2"/><path d="M149.1 21.3 C134.8 46.7 129.9 90.9 132.4 124.7 M151 21.3 C181.4 36.9 196.1 81.1 193.7 129.6" stroke="#94a3b8" strokeWidth="1.2"/><path d="M149.1 21.3 C112.8 25.7 80.4 51.7 72.1 95.3" stroke="#087f79" strokeWidth="3" strokeDasharray="5 4"/><circle cx="149.1" cy="20.3" r="4" fill="#087f79" stroke="none"/><circle cx="72.1" cy="95.8" r="4" fill="#087f79" stroke="none"/><path d="M71.6 98.7 Q44.1 102.2 21.1 109.5" stroke="#b45309" strokeWidth="4"/><circle cx="21.1" cy="109.5" r="4" fill="#b45309" stroke="none"/><text x="86.5" y="26" fill="#087f79" stroke="none" fontSize="20" fontWeight="700">C</text>
    </>
  );
}

export function LabelPositions({ w }: { w: DiagramWords }) {
  return (
    <>
      <path d="M219.2 28.1 C378.2 23.9 475 65.5 475 130 C475 194.5 378.2 236.1 219.2 231.9" fill="#f8fafc" stroke="#334155" strokeWidth="3.2"/><path d="M219.2 42.3 C378.2 38.2 459.6 74.5 459.6 130 C459.6 185.5 378.2 221.8 219.2 217.7" stroke="#94a3b8" strokeWidth="1.3" strokeDasharray="3.9 3.2"/><path d="M219.2 54.6 C378.2 50.4 446.4 82.3 446.4 130 C446.4 177.7 378.2 209.6 219.2 205.4" stroke="#94a3b8" strokeWidth="1.3" strokeDasharray="3.9 3.2"/><ellipse cx="215" cy="130" rx="150" ry="104" fill="#fff" stroke="#334155" strokeWidth="3.2"/><ellipse cx="215" cy="130" rx="140" ry="94" stroke="#e2e8f0" strokeWidth="20"/><ellipse cx="215" cy="130" rx="130" ry="84" stroke="#334155" strokeWidth="1.6"/><path d="M215 130 L339.8 130" stroke="#94a3b8" strokeWidth="1.6"/><path d="M215 130 L277.4 199.8" stroke="#94a3b8" strokeWidth="1.6"/><path d="M215 130 L152.6 199.8" stroke="#94a3b8" strokeWidth="1.6"/><path d="M215 130 L90.2 130" stroke="#94a3b8" strokeWidth="1.6"/><path d="M215 130 L152.6 60.2" stroke="#94a3b8" strokeWidth="1.6"/><path d="M215 130 L277.4 60.2" stroke="#94a3b8" strokeWidth="1.6"/><circle cx="215" cy="130" r="3.9" fill="#334155" stroke="none"/><path d="M223 130 L339 130" stroke="#0f766e" strokeWidth="7" opacity=".85"/><path d="M219 136.9 L277 197.5" stroke="#0f766e" strokeWidth="7" opacity=".85"/><path d="M211 136.9 L153 197.5" stroke="#0f766e" strokeWidth="7" opacity=".85"/><path d="M207 130 L91 130" stroke="#0f766e" strokeWidth="7" opacity=".85"/><path d="M211 123.1 L153 62.5" stroke="#0f766e" strokeWidth="7" opacity=".85"/><path d="M219 123.1 L277 62.5" stroke="#0f766e" strokeWidth="7" opacity=".85"/><circle cx="215" cy="130" r="5" fill="#334155" stroke="none"/><path d="M65 112 L65 148" stroke="#334155" strokeWidth="8"/><rect x="76" y="114" width="20" height="32" rx="2" fill="#fef3c7" stroke="#92400e" strokeWidth="2"/><path d="M150 208 l12 0 l0 24 l-6 -4 l-6 4z" fill="#fef3c7" stroke="#92400e" strokeWidth="2"/><path d="M500 70h80l22 22v110h-102z" fill="#fef3c7" stroke="#92400e" strokeWidth="2"/><circle cx="586" cy="88" r="5" fill="#fff" stroke="#92400e" strokeWidth="2"/><path d="M586 83q30-50 50-14" stroke="#94a3b8" strokeWidth="2"/><g fill="#0f172a" stroke="none" fontSize="20" fontWeight="700" textAnchor="middle"><text x="86" y="172">A</text><text x="156" y="254">B</text><text x="250" y="62">C</text><text x="546" y="146">D</text></g><text x="40" y="20" fill="#334155" stroke="none" fontSize="12">{w.back}</text><text x="440" y="20" fill="#334155" stroke="none" fontSize="12">{w.brimFront}</text>
    </>
  );
}
