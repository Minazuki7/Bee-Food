import Pagination, {
  PaginationProps,
} from '@components/data-display/Pagination';
import Table, { TableProps, TableItem } from '@components/data-display/Table';
import useTableControls from '@hooks/useTableControls';
import { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface ListProps<T extends TableItem>
  extends TableProps<T>,
    PaginationProps {
  canDelete?: boolean;
  canUpdate?: boolean;
  canCreate?: boolean;
}

const List = <T extends TableItem>({
  data,
  headers: headersProp,
  totalPages,
  currentPage,
  onPageChange,
  canDelete,
  canCreate,
  canUpdate,
}: ListProps<T>) => {
  const navigate = useNavigate();
  const headers = useTableControls(headersProp, data, {
    onEdit: canUpdate
      ? ({ id }) => navigate({ pathname: `update/${id}` })
      : undefined,
    onDelete: canDelete
      ? ({ id }) => navigate({ pathname: `delete/${id}` }, { replace: true })
      : undefined,
    onMultipleDelete: canDelete
      ? (ids) =>
          navigate({ pathname: `delete/${ids.join(',')}` }, { replace: true })
      : undefined,
  });
  return (
    <div className="p-10 flex-1 flex flex-col items-center">
      {canCreate && (
        <Link
          className="self-end my-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          to="add"
        >
          Add
        </Link>
      )}

      <Table
        pagination={
          totalPages !== 0
            ? { totalPages, currentPage, onPageChange }
            : undefined
        }
        className="flex-1"
        data={data}
        headers={headers}
      />
    </div>
  );
};

export default List;
