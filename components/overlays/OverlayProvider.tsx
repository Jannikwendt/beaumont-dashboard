"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type PanelKind = "custody" | "position";
export type ModalKind = "ips" | "deviation" | "reports" | "setting";

export type OverlayState = {
  activePanel: { type: PanelKind; id: string } | null;
  activeModal: { type: ModalKind; id?: string } | null;
  expandedDecisionId: string | null;
  commandPaletteOpen: boolean;
};

type OverlayContextValue = OverlayState & {
  openPanel: (type: PanelKind, id: string) => void;
  closePanel: () => void;
  openModal: (type: ModalKind, id?: string) => void;
  closeModal: () => void;
  toggleDecision: (id: string) => void;
  expandDecision: (id: string) => void;
  collapseDecision: () => void;
  toggleCommandPalette: () => void;
  openCommandPalette: () => void;
  closeCommandPalette: () => void;
  closeAll: () => void;
};

const OverlayContext = createContext<OverlayContextValue | null>(null);

export function useOverlays(): OverlayContextValue {
  const ctx = useContext(OverlayContext);
  if (!ctx) {
    throw new Error("useOverlays must be used inside <OverlayProvider>");
  }
  return ctx;
}

export default function OverlayProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activePanel, setActivePanel] =
    useState<OverlayState["activePanel"]>(null);
  const [activeModal, setActiveModal] =
    useState<OverlayState["activeModal"]>(null);
  const [expandedDecisionId, setExpandedDecisionId] = useState<string | null>(
    null
  );
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  const openPanel = useCallback((type: PanelKind, id: string) => {
    setActivePanel({ type, id });
  }, []);
  const closePanel = useCallback(() => setActivePanel(null), []);

  const openModal = useCallback((type: ModalKind, id?: string) => {
    setActiveModal({ type, id });
  }, []);
  const closeModal = useCallback(() => setActiveModal(null), []);

  const toggleDecision = useCallback((id: string) => {
    setExpandedDecisionId((prev) => (prev === id ? null : id));
  }, []);
  const expandDecision = useCallback(
    (id: string) => setExpandedDecisionId(id),
    []
  );
  const collapseDecision = useCallback(() => setExpandedDecisionId(null), []);

  const toggleCommandPalette = useCallback(
    () => setCommandPaletteOpen((v) => !v),
    []
  );
  const openCommandPalette = useCallback(
    () => setCommandPaletteOpen(true),
    []
  );
  const closeCommandPalette = useCallback(
    () => setCommandPaletteOpen(false),
    []
  );

  const closeAll = useCallback(() => {
    setActivePanel(null);
    setActiveModal(null);
    setCommandPaletteOpen(false);
  }, []);

  // Global Cmd/Ctrl+K
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandPaletteOpen((v) => !v);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const value = useMemo<OverlayContextValue>(
    () => ({
      activePanel,
      activeModal,
      expandedDecisionId,
      commandPaletteOpen,
      openPanel,
      closePanel,
      openModal,
      closeModal,
      toggleDecision,
      expandDecision,
      collapseDecision,
      toggleCommandPalette,
      openCommandPalette,
      closeCommandPalette,
      closeAll,
    }),
    [
      activePanel,
      activeModal,
      expandedDecisionId,
      commandPaletteOpen,
      openPanel,
      closePanel,
      openModal,
      closeModal,
      toggleDecision,
      expandDecision,
      collapseDecision,
      toggleCommandPalette,
      openCommandPalette,
      closeCommandPalette,
      closeAll,
    ]
  );

  return (
    <OverlayContext.Provider value={value}>{children}</OverlayContext.Provider>
  );
}

// Helper used by command palette / deviation modal: scroll to a section anchor
// and expand a target decision id afterwards.
export function scrollToSection(id: string, offset = 80) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: "smooth" });
}
