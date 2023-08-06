import Center from "../Layout/center";
import Cover from "../Layout/cover";
import GlobalHeader from "../GlobalHeader";
import PageHead, { Props as PageHeadProps } from "../PageHead";

interface Props extends PageHeadProps {
  children?: React.ReactNode;
}

export const BlogPage = ({ children, ...rest }: Props) => {
  return (
    <>
      <PageHead {...rest} />
      <Cover centered="main">
        <GlobalHeader />
        <main className="blog-page">
          <Center>{children}</Center>
        </main>
      </Cover>
    </>
  );
};

export default BlogPage;
