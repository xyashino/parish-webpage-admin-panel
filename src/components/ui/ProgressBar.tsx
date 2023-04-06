interface ProgressBarProps {
  value: number;
  description: true;
}

export const ProgressBar = ({ value, description }: ProgressBarProps) => {
  const progressBar = (
    <progress className="progress w-56" value={value} max="100"></progress>
  );

  if (description) {
    return (
      <div className="flex flex-col items-center">
        {progressBar}
        <p>{value === 100 ? "Success !" : `${value} %`}</p>
      </div>
    );
  }

  return progressBar;
};
