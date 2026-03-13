import { QRCodeSVG } from "qrcode.react";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ModuleCardProps {
  title: string;
  link: string;
  description?: string;
  objectives?: string;
  badge: string;
  qrImage?: string;
}

export default function ModuleCard({ title, link, description, objectives, badge }: ModuleCardProps) {
  return (
    <div className="bg-card rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-200 border border-border">
      <h4 className="font-display text-lg font-bold text-foreground mb-4">{title}</h4>

      <div className="flex flex-col sm:flex-row gap-5 mb-4">
        {/* QR Code */}
        <div className="flex-shrink-0 bg-secondary rounded-xl p-3 self-start">
          <QRCodeSVG value={link} size={120} bgColor="transparent" fgColor="hsl(var(--foreground))" />
        </div>

        <div className="flex-1 space-y-3">
          {description && (
            <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
          )}
          {objectives && (
            <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{objectives}</div>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-sm font-semibold px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
        >
          <ExternalLink size={16} />
          Accéder au Padlet
        </a>
        <Badge variant="secondary" className="text-xs font-medium">
          {badge}
        </Badge>
      </div>
    </div>
  );
}
