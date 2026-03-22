interface LordIconProps {
  src: string;
  size?: number;
  colors?: string;
  trigger?: string;
  className?: string;
}

/**
 * Animated Lordicon icon component.
 * Used for section headers, navigation, and key cards.
 * Smaller inline icons still use Font Awesome.
 */
export default function LordIcon({
  src,
  size = 32,
  colors = "primary:#3B82F6,secondary:#FFD700",
  trigger = "hover",
  className = "",
}: LordIconProps) {
  return (
    <lord-icon
      src={src}
      trigger={trigger}
      colors={colors}
      style={{ width: `${size}px`, height: `${size}px`, display: "inline-flex" }}
      className={className}
    />
  );
}

// Centralized icon URL map for the whole site
export const LORD_ICONS = {
  home: "https://cdn.lordicon.com/wmwqvixz.json",
  book: "https://cdn.lordicon.com/kipaqhoz.json",
  trophy: "https://cdn.lordicon.com/lewtedlh.json",
  document: "https://cdn.lordicon.com/nocovwne.json",
  avatar: "https://cdn.lordicon.com/dxjqoygy.json",
  email: "https://cdn.lordicon.com/rhvddzym.json",
  star: "https://cdn.lordicon.com/surjmvno.json",
  search: "https://cdn.lordicon.com/msoeawqm.json",
  article: "https://cdn.lordicon.com/lyrrgrsl.json",
  bell: "https://cdn.lordicon.com/vspbqszr.json",
  calendar: "https://cdn.lordicon.com/abfverha.json",
  settings: "https://cdn.lordicon.com/lecprnjb.json",
  check: "https://cdn.lordicon.com/dangivhk.json",
  target: "https://cdn.lordicon.com/iltqorsz.json",
  heart: "https://cdn.lordicon.com/rjzlnunf.json",
  computer: "https://cdn.lordicon.com/qhgmphtg.json",
  bookAlt: "https://cdn.lordicon.com/zyzoecaw.json",
  edit: "https://cdn.lordicon.com/wloilxuq.json",
  trendUp: "https://cdn.lordicon.com/yxyampao.json",
  avatarMan: "https://cdn.lordicon.com/imamsnbq.json",
  starMorph: "https://cdn.lordicon.com/mdgrhyca.json",
  documentAlt: "https://cdn.lordicon.com/wzwygmng.json",
} as const;
