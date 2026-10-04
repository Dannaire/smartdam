// lib/alert-level.ts — Mapping level peringatan ke warna/label (sesuai PRD §5.1)
import { AlertLevel } from "@/types";
import { CheckCircle, AlertTriangle, AlertOctagon, LucideIcon } from "lucide-react";

export interface AlertLevelConfig {
  label: string;
  color: string;         // Tailwind text color
  bg: string;            // Tailwind bg color
  border: string;        // Tailwind border color
  badgeBg: string;       // Tailwind badge bg
  badgeText: string;     // Tailwind badge text
  dot: string;           // Tailwind dot bg
  hex: string;           // Hex color for inline styles
}

export const ALERT_LEVEL_CONFIG: Record<AlertLevel, AlertLevelConfig> = {
  normal: {
    label: "Kondisi Normal",
    color: "text-status-normal",
    bg: "bg-green-50",
    border: "border-status-normal",
    badgeBg: "bg-status-normal",
    badgeText: "text-white",
    dot: "bg-status-normal",
    hex: "#22A55B",
  },
  waspada: {
    label: "Waspada",
    color: "text-status-waspada",
    bg: "bg-yellow-50",
    border: "border-status-waspada",
    badgeBg: "bg-status-waspada",
    badgeText: "text-ink-900",
    dot: "bg-status-waspada",
    hex: "#F5B700",
  },
  siaga: {
    label: "Siaga",
    color: "text-status-siaga",
    bg: "bg-orange-50",
    border: "border-status-siaga",
    badgeBg: "bg-status-siaga",
    badgeText: "text-white",
    dot: "bg-status-siaga",
    hex: "#F08A24",
  },
  awas: {
    label: "Awas",
    color: "text-status-awas",
    bg: "bg-danger-bg",
    border: "border-status-awas",
    badgeBg: "bg-status-awas",
    badgeText: "text-white",
    dot: "bg-status-awas",
    hex: "#E5322D",
  },
};

export function getAlertConfig(level: AlertLevel): AlertLevelConfig {
  return ALERT_LEVEL_CONFIG[level];
}

export function getAlertIcon(level: AlertLevel): LucideIcon {
  const icons: Record<AlertLevel, LucideIcon> = {
    normal: CheckCircle,
    waspada: AlertTriangle,
    siaga: AlertTriangle,
    awas: AlertOctagon,
  };
  return icons[level];
}

export function getNotificationDotColor(level: AlertLevel): string {
  return ALERT_LEVEL_CONFIG[level].dot;
}
