import { useMemo, useState } from "react";

import { useGameStore } from "../stores/useGameStore";

import { getTotalSeconds } from "../helpers/getTotalSeconds";

export const useScores = () => {
      const { scores } = useGameStore();
    
      const [sortField, setSortField] = useState<
        "player_name" | "time_taken" | "created_at"
      >("time_taken");
      const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
    
        const sortedScores = useMemo(() => {
    return [...scores].sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sortField) {
        case "player_name":
          aValue = a.player_name.toLowerCase();
          bValue = b.player_name.toLowerCase();
          break;
        case "time_taken":
          aValue = getTotalSeconds(a.time_taken);
          bValue = getTotalSeconds(b.time_taken);
          break;
        case "created_at":
          aValue = new Date(a.created_at).getTime();
          bValue = new Date(b.created_at).getTime();
          break;
        default:
          return 0;
      }

      if (aValue < bValue) {
        return sortDirection === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortDirection === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [scores, sortField, sortDirection]);

  const handleSort = (field: "player_name" | "time_taken" | "created_at") => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getSortIcon = (field: "player_name" | "time_taken" | "created_at") => {
    if (sortField !== field) return "-";
    return sortDirection === "asc" ? "↑" : "↓";
  };

  return  {scores, sortedScores, getSortIcon, onSort: handleSort};
  
}