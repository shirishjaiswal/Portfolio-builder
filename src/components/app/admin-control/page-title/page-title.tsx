type Props = {
  title: string;
  style?: string;
};
const PageTitle: React.FC<Props> = ({ title, style }: Props) => {
  return <h1 className={`w-full text-2xl font-bold pb-3 ${style}`}>{title}</h1>;
};

export default PageTitle;
