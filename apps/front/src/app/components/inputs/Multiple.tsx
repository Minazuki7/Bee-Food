import { useForm } from '@hooks/useForm';
import classNames from 'classnames';
import { useFormik } from 'formik';
import { isEqual } from 'lodash';
import { useEffect } from 'react';

interface MultipleProps<T> {
  renderItem: (data: {
    item: T;
    index: number;
    onChange: (item: T) => void;
    values: T[];
  }) => React.ReactNode;
  initialValue: T;
  items?: T[];
  onValuesChange?: (values: T[]) => void;
  classes?: {
    container?: string;
    deleteButton?: string;
    addButton?: string;
    button?: string;
  };
  isFull?: boolean;
}

const Multiple = <T,>({
  renderItem,
  items,
  initialValue,
  onValuesChange,
  classes = {},
  isFull,
}: MultipleProps<T>) => {
  const { values, setFieldValue } = useForm({
    initialValues: { items: items?.length ? items : [initialValue] },
  });

  useEffect(() => {
    if (items?.length && !isEqual(items, values.items))
      setFieldValue('items', items);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  useEffect(() => {
    if (onValuesChange) onValuesChange(values.items);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.items]);

  const buttonDimensions = 'h-[32px] w-[32px] mt-[14px] text-lg';

  return (
    <div className={classNames('flex flex-col gap-2', classes.container)}>
      {values.items.map((item, index) => (
        <div key={index} className="flex gap-5">
          <div className="flex-1">
            {renderItem({
              item,
              index,
              onChange: (item) => {
                const nextItems = [...values.items];
                nextItems[index] = item;
                setFieldValue('items', nextItems);
              },
              values: values.items,
            })}
          </div>
          <div className="flex gap-2">
            {values.items.length > 1 && (
              <button
                className={classNames(
                  'rounded text-white bg-red-500 bg-red-500',
                  buttonDimensions,
                  classes.button,
                  classes.deleteButton
                )}
                type="button"
                onClick={() => {
                  setFieldValue(
                    'items',
                    values.items.filter((_item, i) => i !== index)
                  );
                }}
              >
                -
              </button>
            )}
            {!isFull ? (
              <button
                className={classNames(
                  'rounded text-white bg-black',
                  buttonDimensions,
                  classes.button,
                  classes.deleteButton
                )}
                type="button"
                onClick={() => {
                  setFieldValue(
                    'items',

                    [...values.items, initialValue]
                  );
                }}
              >
                +
              </button>
            ) : (
              <div className={buttonDimensions} />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Multiple;
