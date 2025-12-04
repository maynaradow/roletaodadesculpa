import { useState } from "react";
import { SpinWheel } from "@/components/SpinWheel";
import { PrizeCard } from "@/components/PrizeCard";
import { Confetti } from "@/components/Confetti";
const EXCUSES = ["Esse não posso, vou viajar.", "No próximo.", "Nem vou responder essa sarna (vácuo eterno).", "Tá corrido aqui.", "Tô sem ideias.", "Tô estressada."];
const PRIZES = [{
  icon: "✈️",
  text: "Perfeito! Nossa conversa é o seu aquecimento pré-viagem. Você vai aproveitar muito mais depois de curtir minha companhia: leve, animada e pronta pra embarcar na aventura da nossa empresa."
}, {
  icon: "⏰",
  text: "O próximo da semana passada é exatamente este final de semana. Coincidência? Não. Destino. Vem comigo."
}, {
  icon: "👻",
  text: "Parabéns! Você ganhou o Passe Anti-Vácuo™. A consequência é simples: agora você precisa responder. Regras do jogo."
}, {
  icon: "🏃‍♀️",
  text: "Ótimo, eu sou a pessoa ideal pra te ajudar a desacelerar. Há exato 1 ano você tava rindo das minhas piadinhas… lembra? Bateu saudade, né? Então bora."
}, {
  icon: "💡",
  text: "Perfeito! Eu tenho ideias. E todas começam com você dizendo: 'Ok, vou contigo.'"
}, {
  icon: "🧘",
  text: "Você desbloqueou o Combo Anti-Stress™: 2h de bate-papo comigo, um sorriso garantido e uma empresa de sucesso no final."
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
              ROLETÃO DAS
              <br />
              DESCULPAS
            </h1>
            
          </div>
        </header>

        {/* Wheel section */}
        <main className="flex-1 flex flex-col items-center justify-center py-8">
          <SpinWheel onSpinComplete={handleSpinComplete} isSpinning={isSpinning} setIsSpinning={setIsSpinning} />
          
          {/* Instructions */}
          <div className="mt-8 text-center">
            <p className={`font-display text-2xl transition-all duration-300 ${isSpinning ? "text-primary animate-pulse" : "text-muted-foreground"}`}>
              {isSpinning ? "🎰 GIRANDO... AGUARDE SEU DESTINO! 🎰" : "👆 CLIQUE EM 'GIRA!' PARA COMEÇAR 👆"}
            </p>
          </div>
        </main>

        {/* Footer */}
        
      </div>

      {/* Prize popup */}
      {selectedIndex !== null && <PrizeCard excuse={EXCUSES[selectedIndex]} prize={PRIZES[selectedIndex].text} icon={PRIZES[selectedIndex].icon} isVisible={showPrize} onAccept={handleAcceptPrize} />}
    </div>;
};
export default Index;
