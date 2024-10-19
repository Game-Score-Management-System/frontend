import { Button, Pagination } from "@nextui-org/react";

interface TablePaginatorProps {
  page: number;
  setPage: (page: number) => void;
  pages: number;
  onNextPage: () => void;
  onPreviousPage: () => void;
}

export default function TablePaginator({ page, pages, setPage, onNextPage, onPreviousPage }: TablePaginatorProps) {
  return (
    <div className="py-2 px-2 flex justify-center items-center">
      <Pagination
        isCompact
        showControls
        showShadow
        color="primary"
        page={page}
        total={pages}
        onChange={setPage}
      />
      <div className="hidden sm:flex w-[30%] justify-end gap-2">
        <Button
          isDisabled={pages === 1}
          size="sm"
          variant="flat"
          onPress={onPreviousPage}
        >
          Anterior
        </Button>
        <Button
          isDisabled={pages === 1}
          size="sm"
          variant="flat"
          onPress={onNextPage}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}