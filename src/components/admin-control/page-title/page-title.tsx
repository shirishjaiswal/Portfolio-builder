type Props = {
  title: string;
  style?: string;
};
const PageTitle: React.FC<Props> = ({ title, style }: Props) => {
  return <h1 className={` w-full text-3xl font-bold pb-5 ${style}`}>{title}</h1>;
};

export default PageTitle;
