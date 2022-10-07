import classNames from "classnames";
import Pagination, { PaginationProps } from "./Pagination";

export interface TableItem {
  id: string;
}

export interface Header<T extends TableItem> {
  title: string | JSX.Element;
  key: string;
  dataIndex?: keyof T;
  render?: (record: T, index: number) => React.ReactNode;
}

export interface TableProps<T extends TableItem> {
  headers: Header<T>[];
  data: T[];
  emptyComponent?: JSX.Element | string;
  onRowClick?: (row: T, index: number) => void;
  className?: string;
  pagination?: PaginationProps;
}

const Table = <T extends TableItem>({
  headers,
  data,
  emptyComponent = "No data to display",
  onRowClick,
  className,
  pagination,
}: TableProps<T>) => {
  if (data.length === 0) return <div>{emptyComponent}</div>;
  return (
    <div
      className={classNames(
        "flex my-4 px-4 min-h-table flex-col w-full  rounded-lg overflow-hidden",
        className
      )}
    >
      <div className="flex-1">
        <table className="min-w-full align-middle border-collapse ">
          <thead className="min-h-[80px] bg-white">
            <tr>
              {headers.map((header, i) => (
                <th
                  key={header.key}
                  scope="col"
                  className={classNames(
                    "border border-t-0 border-tableBorder font-normal px-2 py-2 text-white text-center text-[18px] bg-trueblack",
                    i === 0 && "border-l-0 rounded-l",
                    i === headers.length - 1 && "border-r-0 rounded-r"
                  )}
                >
                  {header.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white">
            {data.map((row, i) => (
              <tr
                onClick={() => {
                  if (onRowClick) onRowClick(row, i);
                }}
                key={row.id}
              >
                {headers.map((header, index) => {
                  let value: any = header.dataIndex
                    ? row[header.dataIndex]
                    : null;
                  if (header.render) {
                    value = header.render(row, i);
                  }
                  return (
                    <td
                      key={header.key}
                      className={classNames(
                        "min-h-[50px]  px-2 py-2 text-black text-center text-[14px]",
                        i % 2 === 0 ? "bg-tableRow" : "bg-white",
                        index === 0 && "border-l-0",
                        index === headers.length - 1 && "border-r-0"
                      )}
                    >
                      {value}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {pagination && (
        <div className="w-full pt-[20px] pb-[14px] px-[10px] flex  justify-end">
          <Pagination {...pagination} />
        </div>
      )}
    </div>
  );
};

export default Table;
