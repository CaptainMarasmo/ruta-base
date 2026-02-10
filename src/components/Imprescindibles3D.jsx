import { useMemo } from "react";
import { motion } from "framer-motion";

const items = [
  {
    title: "Cataratas del Iguazú",
    text: "El golpe de agua y selva más bestia del país.",
  },
  {
    title: "Buenos Aires",
    text: "Tango, arquitectura y barrios con identidad propia.",
  },
  {
    title: "Salta + Purmamarca",
    text: "Colores imposibles y el norte más auténtico.",
  },
  {
    title: "Perito Moreno (El Calafate)",
    text: "Hielo vivo, cruje y se rompe delante de ti.",
  },
  {
    title: "Ushuaia y Tierra del Fuego",
    text: "El fin del mundo con paisaje de verdad.",
  },
  {
    title: "Bariloche y los Siete Lagos",
    text: "Montaña, lagos y postales seguidas.",
  },
  {
    title: "Puerto Madryn",
    text: "Fauna marina y paisaje patagónico en la costa.",
  },
];

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

function Card({ title, text, index }) {
  const depth = useMemo(() => 6 + (index % 3) * 2, [index]);

  return (
    <motion.div
      className="impCard3d"
      style={{ "--depth": `${depth}px` }}
      whileHover={{ y: -4, rotateX: -6, rotateY: 6 }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
    >
      <div className="impCard3d__inner">
        <div className="impCard3d__title">{title}</div>
        <p className="impCard3d__text">{text}</p>
      </div>
    </motion.div>
  );
}

export default function Imprescindibles3D() {
  return (
    <div className="imp3d">
      <div className="imp3d__grid">
        {items.map((item, index) => (
          <Card key={item.title} index={index} {...item} />
        ))}
      </div>
    </div>
  );
}
