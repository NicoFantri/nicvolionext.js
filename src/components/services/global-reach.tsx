"use client";
import WorldMap from "@/components/ui/world-map";
import { motion } from "framer-motion";

export function GlobalReach() {
  return (
    <div className="py-20 bg-transparent w-full">
      <div className="max-w-7xl mx-auto text-center">
        <p className="font-bold text-2xl md:text-4xl text-foreground">
          Jangkauan Klien{" "}
          <span className="text-red-500">
            {"Global".split("").map((word, idx) => (
              <motion.span
                key={idx}
                className="inline-block"
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.04 }}
              >
                {word}
              </motion.span>
            ))}
          </span>
        </p>
        <p className="text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto py-4">
          Tidak terbatas oleh jarak dan waktu. Saya siap bekerja sama dengan klien dari berbagai belahan dunia secara remote, memberikan layanan IT profesional di mana pun Anda berada.
        </p>
      </div>
      <div className="mt-8">
        <WorldMap
          dots={[
            {
              start: { lat: -7.9839, lng: 112.6214 }, // Malang, Indonesia (Base)
              end: { lat: 34.0522, lng: -118.2437 }, // Los Angeles
            },
            {
              start: { lat: -7.9839, lng: 112.6214 }, // Malang
              end: { lat: 51.5074, lng: -0.1278 }, // London
            },
            {
              start: { lat: -7.9839, lng: 112.6214 }, // Malang
              end: { lat: -33.8688, lng: 151.2093 }, // Sydney
            },
            {
              start: { lat: -7.9839, lng: 112.6214 }, // Malang
              end: { lat: 35.6762, lng: 139.6503 }, // Tokyo
            },
            {
              start: { lat: -7.9839, lng: 112.6214 }, // Malang
              end: { lat: 25.2048, lng: 55.2708 }, // Dubai
            },
            {
              start: { lat: -7.9839, lng: 112.6214 }, // Malang
              end: { lat: -23.5505, lng: -46.6333 }, // Sao Paulo (South America)
            },
          ]}
        />
      </div>
    </div>
  );
}
