import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
interface PrizeCardProps {
  excuse: string;
  prize: string;
  icon: string;
  isVisible: boolean;
  onAccept: () => void;
}
export const PrizeCard = ({
  excuse,
  prize,
  icon,
  isVisible,
  onAccept
}: PrizeCardProps) => {
  if (!isVisible) return null;
  return <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onAccept} />
      
      {/* Confetti */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => <div key={i} className="absolute animate-confetti" style={{
        left: `${Math.random() * 100}%`,
        top: `-20px`,
        width: `${8 + Math.random() * 8}px`,
        height: `${8 + Math.random() * 8}px`,
        backgroundColor: ["hsl(330, 100%, 60%)", "hsl(45, 100%, 55%)", "hsl(180, 100%, 50%)", "hsl(120, 80%, 50%)", "hsl(25, 100%, 55%)", "hsl(280, 100%, 65%)"][Math.floor(Math.random() * 6)],
        borderRadius: Math.random() > 0.5 ? "50%" : "0",
        animationDelay: `${Math.random() * 2}s`,
        animationDuration: `${2 + Math.random() * 2}s`
      }} />)}
      </div>

      {/* Card */}
      <div className={cn("relative max-w-md w-full rounded-2xl overflow-hidden", "animate-bounce-in", "gold-border")} style={{
      background: "linear-gradient(135deg, hsl(260, 50%, 15%), hsl(260, 60%, 10%))"
    }}>
        {/* Shimmer overlay */}
        <div className="absolute inset-0 shimmer pointer-events-none" />
        
        {/* Glowing border effect */}
        <div className="absolute inset-0 rounded-2xl" style={{
        boxShadow: "inset 0 0 30px hsl(330, 100%, 60%, 0.2), 0 0 40px hsl(45, 100%, 50%, 0.3)"
      }} />

        <div className="relative p-6 sm:p-8 text-center">
          {/* Trophy/Star decoration */}
          

          {/* Header */}
          <div className="mt-8 mb-4">
            <p className="text-primary font-display text-2xl tracking-wide text-glow">
              TCHAN TCHAN TCHAN!
            </p>
            <h2 className="font-display text-4xl sm:text-5xl text-secondary text-gold-glow mt-2">
              PRÊMIO ANTI-DESCULPA
            </h2>
          </div>

          {/* Excuse shown */}
          <div className="bg-muted/50 rounded-lg p-3 mb-6 border border-border/30">
            <p className="text-sm text-muted-foreground mb-1">A desculpa foi:</p>
            <p className="text-foreground font-bold italic">"{excuse}"</p>
          </div>

          {/* Prize text */}
          <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl p-4 mb-6" style={{
          boxShadow: "0 0 20px hsl(330, 100%, 60%, 0.2)"
        }}>
            <p className="text-lg sm:text-xl text-foreground font-bold leading-relaxed">
              {prize}
            </p>
          </div>

          {/* Accept button */}
          <Button onClick={onAccept} size="lg" className={cn("w-full font-display text-xl tracking-wide", "bg-gradient-to-r from-secondary via-gold-light to-secondary", "text-secondary-foreground", "hover:scale-105 transition-transform", "shadow-lg hover:shadow-xl", "border-2 border-gold-dark")} style={{
          boxShadow: "0 0 20px hsl(45, 100%, 50%, 0.5)"
        }}>
            ✨ ACEITAR DESTINO ✨
          </Button>

          {/* Footer sparkles */}
          <div className="mt-4 flex justify-center gap-2 text-2xl">
            <span className="animate-float">✨</span>
            <span className="animate-float" style={{
            animationDelay: "0.2s"
          }}>💫</span>
            <span className="animate-float" style={{
            animationDelay: "0.4s"
          }}>✨</span>
          </div>
        </div>
      </div>
    </div>;
};