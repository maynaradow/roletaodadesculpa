import { useState } from "react";
import { SpinWheel } from "@/components/SpinWheel";
import { PrizeCard } from "@/components/PrizeCard";
import { Confetti } from "@/components/Confetti";
const OPTIONS = ["R$ 1.000", "Redução de testa", "R$ 10", "Livro de programação", "Tatuagem", "Um Abraço"];
const PRIZES = [{
  icon: "💰",
  text: "Uau! Mil reais! Mas... espera... a roleta decidiu que você merece algo ainda melhor. Gira de novo!"
}, {
  icon: "💇",
  text: "Visual novo, vida nova! Mas o destino tem outros planos pra você..."
}, {
  icon: "🪙",
  text: "Dez reais! Dá pra um café... ou quase. Mas o universo quer te dar outra coisa."
}, {
  icon: "📖",
  text: "PARABÉNS! Você ganhou o presente mais exclusivo, raro e insubstituível: um Livro sobre Programação! Conhecimento que nenhum dinheiro compra. Prepare o café, o notebook e a paciência — sua nova vida começa agora! 💻"
}, {
  icon: "🎨",
  text: "Uma tattoo! Marcante... literalmente. Mas será que é isso que o destino reservou?"
}, {
  icon: "🤗",
  text: "Um abraço quentinho! Mas a roleta sabe que você precisa de algo mais especial..."
}];
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
    }, 100);
  };
  const handleAcceptPrize = () => {
    setShowPrize(false);
    setShowConfetti(false);
    setSelectedIndex(null);
  };
  return <div className="min-h-screen bg-background overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Radial gradient */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full" style={{
        background: "radial-gradient(circle, hsl(280, 100%, 20%, 0.3) 0%, transparent 70%)"
      }} />
        {/* Floating sparkles */}
        {[...Array(20)].map((_, i) => <div key={i} className="absolute text-2xl animate-float opacity-30" style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 3}s`,
        animationDuration: `${3 + Math.random() * 2}s`
      }}>
            ✨
          </div>)}
      </div>

      <Confetti isActive={showConfetti} />

      <div className="relative z-10 container mx-auto px-4 py-8 flex flex-col items-center min-h-screen">
        {/* Header */}
        <header className="text-center mb-8">
          <div className="inline-block">
            
            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl text-secondary text-gold-glow leading-tight">
              ROLETÃO DO
              <br />
              PRESENTE
            </h1>
            
          </div>
        </header>

        {/* Wheel section */}
        <main className="flex-1 flex flex-col items-center justify-center py-8">
          <SpinWheel onSpinComplete={handleSpinComplete} isSpinning={isSpinning} setIsSpinning={setIsSpinning} />
          
          {/* Instructions */}
          <div className="mt-8 text-center">
            <p className={`font-display text-2xl transition-all duration-300 ${isSpinning ? "text-primary animate-pulse" : "text-muted-foreground"}`}>
              {isSpinning ? "🎁 GIRANDO... AGUARDE SEU PRESENTE! 🎁" : "👆 CLIQUE EM 'GIRA!' PARA GANHAR SEU PRESENTE 👆"}
            </p>
          </div>
        </main>

        {/* Footer */}
        
      </div>

      {/* Prize popup */}
      {selectedIndex !== null && <PrizeCard excuse={OPTIONS[selectedIndex]} prize={PRIZES[selectedIndex].text} icon={PRIZES[selectedIndex].icon} isVisible={showPrize} onAccept={handleAcceptPrize} />}
    </div>;
};
export default Index;