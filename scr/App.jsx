import { useState } from "react";
import { Slider } from "./components/ui/slider";
import { Card, CardContent } from "@radix-ui/react-card";
import { motion } from "framer-motion";

const facialFeatures = {
  rosto: ["Oval", "Bloco", "Ponteiro", "Luna", "Fuso"],
  olhos: ["Felino", "Orbe", "Sombra", "Mono", "Baixo"],
  nariz: ["Fino", "Rondo", "Largo", "Reto", "Gancho"],
  boca: ["Lina", "Cheia", "Topo", "Coração", "Liso"],
  queixo: ["Base", "Pico", "Fundo", "Bola", "Forte"],
  sobrancelhas: ["Reta", "Arco", "Curva", "Unida", "Cheia"],
};

export default function RetratoFaladoMixer() {
  const [mix, setMix] = useState({
    rosto: 0,
    olhos: 0,
    nariz: 0,
    boca: 0,
    queixo: 0,
    sobrancelhas: 0,
  });

  const handleSliderChange = (feature, value) => {
    setMix({ ...mix, [feature]: value[0] });
  };

  const renderCode = () => {
    return Object.entries(mix).map(([key, value]) => {
      const index = Math.floor((value / 100) * (facialFeatures[key].length - 1));
      const nextIndex = index < facialFeatures[key].length - 1 ? index + 1 : index;
      const percentToNext = ((value % (100 / (facialFeatures[key].length - 1))) / (100 / (facialFeatures[key].length - 1))) * 100;
      const base = facialFeatures[key][index];
      const blend = facialFeatures[key][nextIndex];
      return `${key.charAt(0).toUpperCase() + key.slice(1)}: ${base} ${Math.round(100 - percentToNext)}% / ${blend} ${Math.round(percentToNext)}%`;
    }).join("\n");
  };

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-4">
        {Object.keys(facialFeatures).map((feature) => (
          <div key={feature}>
            <label className="block text-sm font-medium capitalize mb-1">{feature}</label>
            <Slider
              min={0}
              max={100}
              step={1}
              value={[mix[feature]]}
              onValueChange={(value) => handleSliderChange(feature, value)}
            />
          </div>
        ))}
      </div>
      <Card>
        <CardContent className="p-4">
          <motion.div
            className="text-sm whitespace-pre-line font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {renderCode()}
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
}
