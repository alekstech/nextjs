import Center from '../Layout/center';
import Cover from '../Layout/cover';
import Footer from '../Footer';
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
        <Footer />
      </Cover>
    </>
  );
};

export default BlogPage;
