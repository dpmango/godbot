interface ILegendObj {
  title: string;
  active: boolean;
}

interface Options {
  colors: string[];
}

interface ILegendButtons {
  buttons: ILegendObj[];
  options: Options;
  handleLegendEdit: (title: string) => void;
}

export const LegendWindow: React.FC<ILegendButtons> = ({
  buttons,
  handleLegendEdit,
  options,
}) => {
  return (
    <div className="legend">
      {buttons.map((item, index) => (
        <button
          key={item.title}
          className={
            item.active
              ? "chart__toggle chart__toggle--active"
              : "chart__toggle"
          }
          onClick={() => handleLegendEdit(item.title)}
        >
          <div
            className="chart__line"
            style={{ background: options.colors[index] }}
          ></div>
          {item.title}
        </button>
      ))}
    </div>
  );
};
