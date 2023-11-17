interface TitleProps {
  title: string;
}

export const Title = ({ title }: TitleProps) => {
  return <h1 className="text-3xl font-bold text-center mb-4">{title}</h1>;
};
