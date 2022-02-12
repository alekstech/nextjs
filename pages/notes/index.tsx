import { useEffect, useState } from 'react';
import PrefetchedLink from '../../components/PrefetchedLink';
import { Stack, Cluster } from "../../components/Layout";
import BlogPage from "../../components/BlogPage";
import StaggeredList from "../../components/StaggeredList";
import { GetServerSidePropsContext } from "next";
import cookie from 'cookie';
import { getRecent, Entry, FetchError } from '../../services/getRecent';

export const meta = {
  title: "Entries",
  description: "Journal entries",
  summary: "All entries",
  image: "",
  imageAlt: "" // max 420 characters for Twitter
};

export async function getServerSideProps(context:GetServerSidePropsContext) {
  const { Authorization } = cookie.parse(context.req.headers.cookie || '');

  let entries: Entry[] = [];
  let ssrLoaded = false;

  try {
    const init = {
      headers: {
        Authorization
      }
    };
    const data = await getRecent({ init });
    entries = data;
    ssrLoaded = true;
  } catch (e: unknown) {
    if (e instanceof FetchError && e.code === 401) {
      const { res } = context;
      res.setHeader("location", "/auth/login");
      res.statusCode = 302;
      res.end();
      return;
    }
  }
  return {
    props: {
      entries,
      ssrLoaded
    }
  };
}

interface EntriesProps {
  entries: Entry[]
  ssrLoaded: boolean
}

const Entries = ({ entries, ssrLoaded }: EntriesProps) => {
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const [list, setList] = useState(entries);

  async function loadData() {
    try {
      setLoading(true);
      const data: Entry[] = await getRecent({ withAuth: true});
      setList(data);
    } catch {
      setFailed(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!ssrLoaded) {
      loadData();
    }
  }, []);

  return (
    <BlogPage {...meta}>
      <Stack>
        <h1>Entries</h1>
        <PrefetchedLink href="/journal/new">
          Create
        </PrefetchedLink>
        {loading &&
          <p>Loading</p>
        }
        {failed &&
          <>
            <p>There was an error</p>
            <button>Retry</button>
          </>
        }
        {!failed && !loading && !list.length &&
          <p>Your entries will appear here</p>
        }
        {!failed && !loading && list.length &&
          <StaggeredList>
            {
              list.map(({ EntryBody, EntryId }) => (
                <Stack key={EntryBody}>
                  <p>
                    {EntryBody}
                  </p>
                  <Cluster>
                    <PrefetchedLink href={`/journal/${EntryId}`}>
                      Edit
                    </PrefetchedLink>
                    <PrefetchedLink href={`/journal/${EntryId}/delete`}>
                      Delete
                    </PrefetchedLink>
                  </Cluster>
                </Stack>
              ))
            }
          </StaggeredList>
        }
      </Stack>
    </BlogPage>
  );
};

export default Entries;
