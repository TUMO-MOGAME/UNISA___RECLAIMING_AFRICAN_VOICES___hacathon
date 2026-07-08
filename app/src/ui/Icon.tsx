// Central icon set — Lucide (never emoji). One consistent, crisp, properly-aligned set across web +
// native (renders via react-native-svg). Import { Icon } and use e.g. <Icon.ChevronRight size={20} />.
//
// NOTE: Lucide is loaded via require() and typed with the tiny IconProps below on purpose. Its barrel
// re-exports ~1,500 icons × 3 aliases; letting the type-checker walk that graph overflows tsc's stack.
// require keeps the runtime identical while giving tsc a trivial type to check against.
import type { ComponentType } from "react";

export type IconProps = { size?: number; color?: string; strokeWidth?: number; fill?: string };
type IconComp = ComponentType<IconProps>;

const L = require("lucide-react-native") as Record<string, IconComp>;

export const Icon = {
  Mic: L.Mic,
  Play: L.Play,
  Square: L.Square,
  Lock: L.Lock,
  Users: L.Users,
  Volume2: L.Volume2,
  VolumeX: L.VolumeX,
  Trash2: L.Trash2,
  Check: L.Check,
  Clock: L.Clock,
  ArrowUpRight: L.ArrowUpRight,
  ArrowRight: L.ArrowRight,
  ChevronRight: L.ChevronRight,
  ChevronLeft: L.ChevronLeft,
  ChevronDown: L.ChevronDown,
  ChevronUp: L.ChevronUp,
  ArrowUp: L.ArrowUp,
  // NOTE: this lucide build (v1.23) has no "Youtube" icon — Headphones fits the music credit and exists.
  Headphones: L.Headphones,
  Search: L.Search,
  X: L.X,
  Pause: L.Pause,
  RotateCcw: L.RotateCcw,
  ImageIcon: L.Image,
  Film: L.Film,
  Music: L.Music,
  CalendarDays: L.Calendar,
  BookOpen: L.BookOpen,
  Newspaper: L.Newspaper,
  ExternalLink: L.ExternalLink,
  Flag: L.Flag,
  MessageCircle: L.MessageCircle,
  Send: L.Send,
  Sparkles: L.Sparkles,
};
