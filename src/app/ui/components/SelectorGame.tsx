'use client'

import { Select, SelectItem } from "@nextui-org/react"
import { useAppSelector } from "../hooks/useStore";

export default function SelectorGame() {
  const selectedGame = useAppSelector(state => state.game.selectedGame);

  return (
    <header className="w-full">
      <Select
        variant="bordered"
        label="Selecciona un juego"
        className="w-full "
        defaultSelectedKeys={[selectedGame]}
        isDisabled
      >
        <SelectItem key={selectedGame}>
          {selectedGame}
        </SelectItem>

      </Select>
    </header>
  )
}