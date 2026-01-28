"use client";

import { motion } from "framer-motion";
import { HeroTile } from "./hero-tile";
import { LiveStatusTile } from "./live-status-tile";
import { VoiceDemoTile } from "../demos/voice-demo-tile";
import { TechStackTile } from "./tech-stack-tile";
import { RoiCalculator } from "../lead-magnet/roi-calculator";
import { WebsiteOfferTile } from "./website-offer-tile";

export function BentoGrid() {
  const tiles = [
    { delay: 0, className: "md:col-span-2 lg:col-span-2 lg:row-span-2", component: <HeroTile /> },
    { delay: 100, className: "md:col-span-2 lg:col-span-2", component: <LiveStatusTile /> },
    { delay: 200, className: "md:col-span-1 lg:col-span-1", component: <VoiceDemoTile /> },
    { delay: 300, className: "md:col-span-1 lg:col-span-1", component: <TechStackTile /> },
    { delay: 400, className: "md:col-span-2 lg:col-span-2", component: <RoiCalculator /> },
    { delay: 500, className: "md:col-span-2 lg:col-span-2", component: <WebsiteOfferTile /> },
  ];

  return (
    <section className="py-16 md:py-24 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-auto">
          {tiles.map((tile, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: tile.delay / 1000 }}
              className={tile.className}
            >
              {tile.component}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
