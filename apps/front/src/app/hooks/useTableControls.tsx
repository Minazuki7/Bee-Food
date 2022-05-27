import { useState, useEffect } from 'react';

import { Header } from '@components/data-display/Table';

import Edit from '@assets/svg/edit.svg';
import Trash from '@assets/svg/trash.svg';

const checkboxClassName = 'h-5 w-5';

function useTableControls<T extends { id: string }>(
  headers: Header<T>[],
  data: T[],
  {
    onEdit,
    onDelete,
    onMultipleDelete,
  }: {
    onEdit?: (row: T, index: number) => void;
    onDelete?: (row: T, index: number) => void;
    onMultipleDelete?: (values: string[]) => void;
  } = {}
) {
  const [values, valuesChange] = useState<{ id: string; checked: boolean }[]>(
    []
  );

  useEffect(() => {
    valuesChange((prevValues) =>
      data.map(
        ({ id }) =>
          prevValues.find((value) => value.id === id) || {
            id,
            checked: false,
          }
      )
    );
  }, [data]);

  function checkAll(e: React.ChangeEvent<HTMLInputElement>) {
    valuesChange(values.map(({ id }) => ({ id, checked: e.target.checked })));
  }

  function onRowCheck(e: React.ChangeEvent<HTMLInputElement>, i: number) {
    const table = [...values];
    table[i] = { ...table[i], checked: e.target.checked };
    valuesChange(table);
  }

  return [
    onMultipleDelete && {
      title: values.length ? (
        <input
          type="checkbox"
          className={checkboxClassName}
          onChange={checkAll}
          checked={values.every((value) => value.checked)}
        />
      ) : (
        ''
      ),
      key: '__check__',
      render(row: T, i: number) {
        return (
          <input
            className={checkboxClassName}
            type="checkbox"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              onRowCheck(event, i)
            }
            checked={values[i] ? values[i].checked : false}
          />
        );
      },
    },
    ...headers,
    (onMultipleDelete || onEdit || onDelete) && {
      title: 'Action',
      key: '__controls__',
      render: (row: T, index: number) => {
        return (
          <div className="flex gap-3 justify-center">
            {onEdit && (
              <button onClick={() => onEdit(row, index)}>
                <img alt="edit" src={Edit} />
              </button>
            )}
            {onDelete && (
              <button onClick={() => onDelete(row, index)}>
                <img alt="delete" src={Trash} />
              </button>
            )}
          </div>
        );
      },
    },
  ].filter(Boolean) as Header<T>[];
}

export default useTableControls;
