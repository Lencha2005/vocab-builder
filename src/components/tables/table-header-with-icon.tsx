import Icon from '../ui/icon';

type TableHeaderWithIconProps = {
  iconName: string;
  label: string;
};

export default function TableHeaderWithIcon({
  iconName,
  label,
}: TableHeaderWithIconProps) {
  return (
    <div className="flex items-center justify-between">
      {label}
      <span className="hidden md:inline-block">
        <Icon
          name={iconName}
          className="md:w-7 md:h-7 xl:w-8 xl:h-8 md:ml-[10px]"
        />
      </span>
    </div>
  );
}
