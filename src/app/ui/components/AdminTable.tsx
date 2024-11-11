import { Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { Key } from "react";
import EmptyContent from "./EmptyContent";


interface Props<T> {
  header: React.ReactNode;
  footer: React.ReactNode;
  columns: { name: string; uid: string }[];
  isLoading: boolean;
  items: T[];
  renderCell: (item: T, columnKey: Key) => React.JSX.Element | undefined;
}

export default function AdminTable<T>({ header, footer, columns, isLoading, items, renderCell }: Props<T>) {
  return (
    <Table
      aria-label="Example table with custom cells"
      classNames={{ wrapper: "bg-transparent/40" }}
      isHeaderSticky={true}
      bottomContent={footer}
      bottomContentPlacement="outside"
      topContent={header}
      topContentPlacement="outside"

    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        items={items}
        isLoading={isLoading}
        loadingContent={<Spinner label="Cargando..." />}
        emptyContent={
          <p className="flex justify-center my-3">
            <EmptyContent message="No hay elementos disponibles 🤔" />
          </p>
        }
      >
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}