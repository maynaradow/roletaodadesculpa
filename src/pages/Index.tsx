import { useState } from "react";
import { SpinWheel } from "@/components/SpinWheel";
import { PrizeCard } from "@/components/PrizeCard";
import { Confetti } from "@/components/Confetti";

const EXCUSES = [
  "Esse não posso, vou viajar.",
  "No próximo.",
  "Nem vou responder essa sarna (vácuo eterno).",
  "Tá corrido aqui.",
  "Tô sem ideias.",
  "Tô estressada.",
];

const PRIZES = [
  {
    icon: "✈️",
    text: "Perfeito, porque o encontro é seu aquecimento pré-viagem. Te deixo leve e pronta para embarcar.",
  },
  {
    icon: "⏰",
    text: "Ótimo! O próximo é exatamente agora. Cadê você?",
  },
  {
    icon: "👻",
    text: "Parabéns! Você ganhou o Passe Anti-Vácuo™: por contrato desse reality, agora você precisa responder.",
  },
  {
    icon: "🏃‍♀️",
    text: "Ótimo! Corre pra cá rapidinho e eu te ajudo a desacelerar.",
  },
  {
    icon: "💡",
    text: "Perfeito! Eu tenho ideias. E todas começam com você dizendo: 'Ok, vamos sair.'",
  },
  {
    icon: "🧘",
    text: "Você desbloqueou o Combo Anti-Stress: 2h de papo comigo e um sorriso garantido no final.",
  },
];

const Index = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [showPrize, setShowPrize] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleSpinComplete = (index: number) => {
    setSelectedIndex(index);
    setShowConfetti(true);
    setTimeout(() => {
      setShowPrize(true);
    }, 500);
  };

  const handleAcceptPrize = () => {
    setShowPrize(false);
    setShowConfetti(false);
    setSelectedIndex(null);
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Radial gradient */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(280, 100%, 20%, 0.3) 0%, transparent 70%)",
          }}
        />
        {/* Floating sparkles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-2xl animate-float opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          >
            ✨
          </div>
        ))}
      </div>

      <Confetti isActive={showConfetti} />

      <div className="relative z-10 container mx-auto px-4 py-8 flex flex-col items-center min-h-screen">
        {/* Header */}
        <header className="text-center mb-8">
          <div className="inline-block">
            <p className="font-display text-xl sm:text-2xl text-primary text-glow tracking-wider mb-2">
              🎬 REALITY EDITION 🎬
            </p>
            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl text-secondary text-gold-glow leading-tight">
              ROLETÃO DAS
              <br />
              DESCULPAS
            </h1>
            <p className="mt-4 text-muted-foreground text-lg sm:text-xl max-w-md mx-auto">
              A Mulher 1 gira, o destino decide, a desculpa <span className="text-primary font-bold">não cola</span>!
            </p>
          </div>
        </header>

        {/* Wheel section */}
        <main className="flex-1 flex flex-col items-center justify-center py-8">
          <SpinWheel 
            onSpinComplete={handleSpinComplete}
            isSpinning={isSpinning}
            setIsSpinning={setIsSpinning}
          />
          
          {/* Instructions */}
          <div className="mt-8 text-center">
            <p className={`font-display text-2xl transition-all duration-300 ${isSpinning ? "text-primary animate-pulse" : "text-muted-foreground"}`}>
              {isSpinning ? "🎰 GIRANDO... AGUARDE SEU DESTINO! 🎰" : "👆 CLIQUE EM 'GIRA!' PARA COMEÇAR 👆"}
            </p>
          </div>
        </main>

        {/* Footer */}
        <footer className="text-center py-4">
          <p className="text-muted-foreground text-sm">
            Um quadro de <span className="text-primary">matchmaking caótico</span> que você não pode perder
          </p>
          <div className="flex justify-center gap-4 mt-2 text-2xl">
            <span>💕</span>
            <span>🎪</span>
            <span>✨</span>
          </div>
        </footer>
      </div>

      {/* Prize popup */}
      {selectedIndex !== null && (
        <PrizeCard
          excuse={EXCUSES[selectedIndex]}
          prize={PRIZES[selectedIndex].text}
          icon={PRIZES[selectedIndex].icon}
          isVisible={showPrize}
          onAccept={handleAcceptPrize}
        />
      )}
    </div>
  );
};

export default Index;
