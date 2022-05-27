import { QueryHookOptions, QueryResult } from '@apollo/client';
import { graphQLResult } from '@utils/graphql';
import { useEffect, useMemo, useRef, useState } from 'react';
import Select, { SelectOption, SelectProps, SelectValue } from './Select';

type ListQueryData<T> = T extends (...args: any[]) => QueryResult<infer R, any>
  ? R[keyof R] extends { data: any }
    ? R[keyof R]['data'] extends (infer F)[]
      ? F
      : R[keyof R]['data']
    : R[keyof R]
  : unknown;

type ListVariables<T> = T extends (...args: any[]) => QueryResult<any, infer R>
  ? R
  : unknown;

export type AutoCompleteValue<Multiple extends boolean> = Multiple extends true
  ? SelectOption[]
  : SelectOption;

interface AutoCompleteProps<
  Query extends (
    options?: QueryHookOptions<any>
  ) => QueryResult<{ [K: string]: { data: unknown[] } }, any>,
  Multiple extends boolean
> extends Omit<
    SelectProps<Multiple>,
    'options' | 'children' | 'value' | 'onChange'
  > {
  value: AutoCompleteValue<Multiple>;
  onChange: (value: AutoCompleteValue<Multiple>) => void;
  query: Query;
  formatItem?: (item: ListQueryData<Query>) => SelectOption;
  formatVariables?: (search: string) => ListVariables<Query>;
  multiple?: Multiple;
}

const AutoComplete = <
  Query extends (options?: QueryHookOptions<any>) => QueryResult<any, any>,
  Multiple extends boolean = false
>({
  query,
  formatItem = (item) => ({ name: item.name, value: item.id }),
  formatVariables = (search) => ({ search } as any),
  placeholder,
  value,
  onChange,
  ...rest
}: AutoCompleteProps<Query, Multiple>) => {
  const [search, setSearch] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { data } = query({
    variables: formatVariables(search),
    fetchPolicy: 'network-only',
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      let nextSearch = '';
      if (!Array.isArray(value)) nextSearch = value.value;
      setSearch('');
    }
  }, [open, value]);

  const options = useMemo(() => {
    let items = [] as SelectOption[];
    const valueArray = (Array.isArray(value) ? [...value] : [value]).map(
      (v) => ({ ...v, hidden: true })
    ) as SelectOption[];
    if (data) {
      items = graphQLResult<{ data: any[] }>(data).data.map((item) =>
        formatItem(item)
      );
    }

    return [
      ...items,
      ...valueArray.filter(
        (v) => !items.find((item) => item.value === v.value)
      ),
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, value]);

  return (
    <Select
      {...rest}
      showPlaceholder={false}
      open={open}
      options={options}
      value={
        (Array.isArray(value)
          ? value.map((v) => v.value)
          : value.value) as SelectValue<Multiple>
      }
      onClick={() => {
        setOpen(!open);
        inputRef.current?.focus();
      }}
      onClose={() => setOpen(false)}
      onChange={(value) => {
        const autCompleteValue = Array.isArray(value)
          ? options.filter((option) => value.some((v) => option.value === v))
          : options.find((option) => value === option.value);

        if (autCompleteValue) {
          onChange(autCompleteValue as AutoCompleteValue<Multiple>);
        }

        if (Array.isArray(value)) {
          inputRef.current?.focus();
        }
      }}
    >
      <input
        className="appearance-none border-none w-1/2 py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
        ref={inputRef}
        value={search}
        placeholder={placeholder}
        onChange={(e) => {
          setSearch(e.target.value);
          if (!open) setOpen(true);
        }}
      />
    </Select>
  );
};

export default AutoComplete;
