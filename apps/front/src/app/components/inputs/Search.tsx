import classnames from 'classnames';

import SearchIcon from '@assets/svg/search.svg';

interface SearchProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  className?: string;
}

const Search = ({ className, ...rest }: SearchProps) => {
  return (
    <div
      className={classnames(
        'flex items-center h-[50px] rounded bg-search px-[15px]',
        className
      )}
    >
      <input
        placeholder="Recherche"
        {...rest}
        className="appearance-none bg-transparent border-none focus:outline-none focus:shadow-outline placeholder-opacity-100 flex-1 pr-2 text-white text-base"
      />
      <img alt="" src={SearchIcon} />
    </div>
  );
};

export default Search;
