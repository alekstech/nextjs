import Center from '../Layout/center';
import Cover from '../Layout/cover';
import Header from '../Header';
import PageHead, { Props as PageHeadProps } from '../PageHead';

interface Props extends PageHeadProps{
  children?: React.ReactNode
}

export const BlogPage = ({ children, ...rest }: Props) => {


  return (
    <>
      <PageHead {...rest} />
      <Cover centered="main">
        <Header />
        <main className="blog-page">
          <Center>
            {children}
          </Center>
        </main>
      </Cover>
    </>
  );
};

export default BlogPage;
