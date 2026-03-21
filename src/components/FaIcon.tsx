interface FaIconProps {
  icon: string;
  className?: string;
}

export default function FaIcon({ icon, className = "" }: FaIconProps) {
  return <i className={`${icon} ${className}`} aria-hidden="true" />;
}
