'use client'

import { Select, SelectItem } from "@nextui-org/react"

export default function SelectorGame() {

  return (
    <header className="w-full">
      <Select
        variant="bordered"
        label="Selecciona un juego"
        className="w-full "
        defaultSelectedKeys={['tetris']}

      >
        <SelectItem key='tetris'>
          Tetris
        </SelectItem>
        <SelectItem key='pacman'>
          Pacman
        </SelectItem>

      </Select>
    </header>
  )
}