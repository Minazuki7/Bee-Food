import classNames from 'classnames';
interface Props {
  textClassName?: string;
  image: string;
  text: string;
  width: number;
  height: number;
  className?: string;
}

const ImageTextRow = ({
  image,
  text,
  width,
  height,
  className,
  textClassName,
}: Props) => {
  return (
    <div className={classNames('flex items-center', className)}>
      <img src={image} alt=" " className="mr-2" width={width} height={height} />
      <span
        className={classNames(
          'text-white text-sm underline cursor-pointer',
          textClassName
        )}
      >
        {text}
      </span>
    </div>
  );
};

export default ImageTextRow;
