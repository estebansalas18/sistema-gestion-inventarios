interface TitleProps {
  title: string;
  subtitle?: string;
}

export const Title = ({ title, subtitle }: TitleProps) => {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold">{title}</h1>
      <h2 className="text-base font-semibold text-gray-500 mb-4">{subtitle}</h2>
    </div>
  );
};
