"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  COMMAND_ITEMS,
  GROUP_ORDER,
  CHORD_PREFIX,
  type CommandItem,
  type ShortcutKey,
} from "@/config/commandPalette";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { useCommandPalette } from "@/hooks/useCommandPalette";
import { cn } from "@/lib/utils";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { toggleThemeWithSound } from "@/lib/themeToggle";

export default function CommandPalette() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const chordTimeoutRef = useRef<number | null>(null);
  const globalChordTimeoutRef = useRef<number | null>(null);

  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [pendingChord, setPendingChord] = useState<ShortcutKey | null>(null);

  const { isOpen, closePalette } = useCommandPalette();
  const { setTheme, resolvedTheme } = useTheme();

  const handleClosePalette = useCallback(() => {
    setQuery("");
    setSelectedIndex(0);
    setPendingChord(null);
    if (chordTimeoutRef.current) {
      window.clearTimeout(chordTimeoutRef.current);
      chordTimeoutRef.current = null;
    }
    closePalette();
  }, [closePalette]);

  const executeItem = useCallback(
    (item: CommandItem) => {
      if (item.href) {
        router.push(item.href);
      } else if (item.id === "theme") {
        toggleThemeWithSound(setTheme, resolvedTheme === "dark");
      } else {
        item.action?.();
      }

      handleClosePalette();
    },
    [handleClosePalette, resolvedTheme, router, setTheme],
  );

  const findChordMatch = useCallback((secondKey: string) => {
    return COMMAND_ITEMS.find((item) => {
      return (
        item.shortcuts[0].toLowerCase() === CHORD_PREFIX &&
        item.shortcuts.length === 2 &&
        item.shortcuts[1].toLowerCase() === secondKey
      );
    });
  }, []);

  const findSingleKeyMatch = useCallback((key: string) => {
    return COMMAND_ITEMS.find(
      (item) =>
        item.shortcuts.length === 1 && item.shortcuts[0].toLowerCase() === key,
    );
  }, []);

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return COMMAND_ITEMS;
    }

    return COMMAND_ITEMS.filter((item) => {
      return (
        item.label.toLowerCase().includes(normalizedQuery) ||
        item.href?.toLowerCase().includes(normalizedQuery) === true
      );
    });
  }, [query]);

  const groupedItems = useMemo(() => {
    return GROUP_ORDER.map((groupKey) => ({
      groupKey,
      items: filteredItems.filter((item) => item.group === groupKey),
    })).filter((group) => group.items.length > 0);
  }, [filteredItems]);

  const maxIndex = filteredItems.length - 1;
  const safeSelectedIndex =
    filteredItems.length === 0 ? -1 : Math.min(selectedIndex, maxIndex);
  const selectedItem =
    safeSelectedIndex >= 0 ? filteredItems[safeSelectedIndex] : null;

  const shortcutsOnlyMode = query.trim().length === 0;

  useEffect(() => {
    const handleGlobalChords = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey || event.altKey) {
        return;
      }

      const activeElement = document.activeElement;
      if (
        activeElement instanceof HTMLElement &&
        (activeElement.isContentEditable ||
          activeElement.tagName === "INPUT" ||
          activeElement.tagName === "TEXTAREA" ||
          activeElement.tagName === "SELECT")
      ) {
        return;
      }

      const key = event.key.toLowerCase() as ShortcutKey;

      if (key === "d") {
        const themeItem = findSingleKeyMatch(key);

        if (themeItem) {
          event.preventDefault();
          executeItem(themeItem);
        }

        return;
      }

      if (pendingChord === null) {
        if (key === CHORD_PREFIX) {
          event.preventDefault();
          setPendingChord(key);
          if (globalChordTimeoutRef.current) {
            window.clearTimeout(globalChordTimeoutRef.current);
          }
          globalChordTimeoutRef.current = window.setTimeout(() => {
            setPendingChord(null);
            globalChordTimeoutRef.current = null;
          }, 900);
        }
        return;
      }

      const chordItem = findChordMatch(key);

      if (chordItem) {
        event.preventDefault();
        executeItem(chordItem);
        return;
      }

      setPendingChord(null);
      if (globalChordTimeoutRef.current) {
        window.clearTimeout(globalChordTimeoutRef.current);
        globalChordTimeoutRef.current = null;
      }
    };

    window.addEventListener("keydown", handleGlobalChords);

    return () => {
      window.removeEventListener("keydown", handleGlobalChords);
    };
  }, [executeItem, findChordMatch, findSingleKeyMatch, pendingChord]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const rafId = window.requestAnimationFrame(() => {
      inputRef.current?.focus();
    });

    return () => {
      window.cancelAnimationFrame(rafId);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePaletteNavigation = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        handleClosePalette();
        return;
      }

      if (filteredItems.length === 0) {
        return;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        const currentIndex = safeSelectedIndex < 0 ? 0 : safeSelectedIndex;
        setSelectedIndex((currentIndex + 1) % filteredItems.length);
        return;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        const currentIndex = safeSelectedIndex < 0 ? 0 : safeSelectedIndex;
        setSelectedIndex(
          currentIndex === 0 ? filteredItems.length - 1 : currentIndex - 1,
        );
        return;
      }

      if (event.key === "Enter" && selectedItem) {
        event.preventDefault();
        executeItem(selectedItem);
        return;
      }

      if (!shortcutsOnlyMode) {
        return;
      }

      const key = event.key.toLowerCase() as ShortcutKey;
      const isLetterKey = /^[a-z]$/i.test(event.key);

      if (pendingChord === null) {
        if (key === CHORD_PREFIX) {
          event.preventDefault();
          setPendingChord(key);
          if (chordTimeoutRef.current) {
            window.clearTimeout(chordTimeoutRef.current);
          }
          chordTimeoutRef.current = window.setTimeout(() => {
            setPendingChord(null);
            chordTimeoutRef.current = null;
          }, 900);
        } else if (isLetterKey) {
          return;
        }
        return;
      }

      if (pendingChord === CHORD_PREFIX) {
        const chordItem = findChordMatch(key);

        if (chordItem) {
          event.preventDefault();
          executeItem(chordItem);
          return;
        }

        if (isLetterKey) {
          event.preventDefault();
          setPendingChord(null);
          if (chordTimeoutRef.current) {
            window.clearTimeout(chordTimeoutRef.current);
            chordTimeoutRef.current = null;
          }
        }
      }
    };

    window.addEventListener("keydown", handlePaletteNavigation);

    return () => {
      window.removeEventListener("keydown", handlePaletteNavigation);
    };
  }, [
    isOpen,
    filteredItems,
    safeSelectedIndex,
    selectedItem,
    shortcutsOnlyMode,
    pendingChord,
    executeItem,
    findChordMatch,
    handleClosePalette,
  ]);

  useEffect(() => {
    return () => {
      if (chordTimeoutRef.current) {
        window.clearTimeout(chordTimeoutRef.current);
      }
      if (globalChordTimeoutRef.current) {
        window.clearTimeout(globalChordTimeoutRef.current);
      }
    };
  }, []);

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-70 bg-background/60 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.16, ease: "easeOut" }}
          onClick={handleClosePalette}
        >
          <div className="flex min-h-full items-start justify-center px-4 pt-20 sm:pt-24">
            <motion.div
              className="w-full max-w-md rounded-2xl border border-border/60 bg-background/95 shadow-2xl"
              initial={{ opacity: 0, scale: 0.96, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -8 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center gap-2 border-b border-border/60 px-3 py-2.5">
                <Search
                  className="size-4 text-muted-foreground"
                  aria-hidden="true"
                />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Type a command or search..."
                  className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                  aria-label="Search command palette"
                />
              </div>

              <div className="max-h-[60vh] overflow-y-auto p-2">
                {groupedItems.length === 0 ? (
                  <p className="rounded-lg px-2 py-6 text-center text-sm text-muted-foreground">
                    No matching commands.
                  </p>
                ) : (
                  groupedItems.map((group) => (
                    <section key={group.groupKey} className="mb-2 last:mb-0">
                      <h3 className="px-2 pb-1 text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
                        {group.groupKey}
                      </h3>

                      <ul className="space-y-1">
                        {group.items.map((item) => {
                          const commandIndex = filteredItems.findIndex(
                            (candidate) => candidate.id === item.id,
                          );

                          return (
                            <li key={item.id}>
                              <button
                                type="button"
                                onClick={() => {
                                  executeItem(item);
                                }}
                                onMouseEnter={() =>
                                  setSelectedIndex(commandIndex)
                                }
                                className={cn(
                                  "flex w-full items-center justify-between rounded-lg px-2 py-2 text-left text-sm transition-colors",
                                  commandIndex === safeSelectedIndex
                                    ? "bg-muted/40 text-foreground"
                                    : "text-muted-foreground hover:bg-muted/40 hover:text-foreground",
                                )}
                              >
                                <span className="flex items-center gap-2">
                                  <span className="text-muted-foreground">
                                    {item.icon}
                                  </span>
                                  <span>{item.label}</span>
                                </span>

                                <KbdGroup className="gap-1.5">
                                  <Kbd>{item.shortcuts[0]}</Kbd>
                                  {item.shortcuts.length === 2 ? (
                                    <>
                                      <span className="text-[10px] text-muted-foreground">
                                        +
                                      </span>
                                      <Kbd>{item.shortcuts[1]}</Kbd>
                                    </>
                                  ) : null}
                                </KbdGroup>
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </section>
                  ))
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
