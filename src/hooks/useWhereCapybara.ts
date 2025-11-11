import { useState, useRef, useEffect } from "react";
import type { Position } from "../interfaces/interfaces";

export const useWhereCapybara = () => {
      const [targetVisible, setTargetVisible] = useState(false);
  const [targetPosition, setTargetPosition] = useState<Position>({
    x: 0,
    y: 0,
  });
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    console.log("Image clicked at:", { x, y });

    setTargetPosition({ x, y });
    setTargetVisible(true);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      imageContainerRef.current &&
      !imageContainerRef.current.contains(e.target as Node) &&
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setTargetVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

    return {
    targetVisible,
    targetPosition,
    imageContainerRef,
    dropdownRef,
    handleImageClick,
    }
}