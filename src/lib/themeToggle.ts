import { defineSound } from "@web-kits/audio";

const toggleSound = defineSound({
    source: {
        type: "triangle",
        frequency: { start: 370, end: 275 },
    },
    envelope: {
        attack: 0.001,
        decay: 0.02,
        sustain: 0,
        release: 0.6,
    },
    gain: 0.2,
});

type ThemeMode = "light" | "dark";

type ThemeSetter = (theme: ThemeMode) => void;

export function toggleThemeWithSound(setTheme: ThemeSetter, isDark: boolean) {
    toggleSound({
        volume: 1,
        velocity: isDark ? 0.6 : 1,
        detune: isDark ? -80 : 80,
        pan: 0,
    });

    setTheme(isDark ? "light" : "dark");
}