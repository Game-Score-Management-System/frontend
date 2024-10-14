'use client';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@nextui-org/react";

const rows = [
  {
    "scoreId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "userId": "1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p",
    "game": "Tetris",
    "score": 500,
    "createdAt": "2024-10-13T22:39:46.512Z",
    "updatedAt": "2024-10-13T22:39:46.512Z",
    "profilePicture": "https://robohash.org/jane",
    "username": "janesmith",
    "position": 1
  },
];

const columns = [
  {
    key: "username",
    label: "Usuario"
  },
  {
    key: "score",
    label: "Puntuación"
  },
  {
    key: "createdAt",
    label: "Fecha"
  },
  {
    key: 'position',
    label: 'Posición'
  }
];

export default function TableCustom() {

  return (
    <Table aria-label="Example table with dynamic content">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={rows}>
        {(item) => (
          <TableRow key={item.scoreId}>
            {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}