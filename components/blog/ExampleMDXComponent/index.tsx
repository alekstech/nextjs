type ExampleMDXComponentProps = {
  name: string;
}

export const ExampleMDXComponent = ({ name }: ExampleMDXComponentProps) => {
  return (
    <p>{name}</p>
  );
};

export default ExampleMDXComponent;
