"use client";

import CommandPalette from "./CommandPalette";
import CustodyPanel from "./CustodyPanel";
import DeviationModal from "./DeviationModal";
import IpsModal from "./IpsModal";
import PositionPanel from "./PositionPanel";
import ReportsModal from "./ReportsModal";
import SettingsModal from "./SettingsModal";

export default function OverlayRoot() {
  return (
    <>
      <IpsModal />
      <ReportsModal />
      <DeviationModal />
      <SettingsModal />
      <CustodyPanel />
      <PositionPanel />
      <CommandPalette />
    </>
  );
}
