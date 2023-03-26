import PrefetchedLink from '../../components/PrefetchedLink';
import { GetServerSidePropsContext } from "next";
import cookie from 'cookie';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { withSSRContext } from "aws-amplify";
import initializeAmplify from "../../contexts/authentication/initialize";
import { NextRequest } from 'next/server';

initializeAmplify();

export interface Entry {
  EntryId: string
  EntryBody: string
  CreatedTime: string
  UpdatedTime: string
  IsFavorite: string
}

export class FetchError {
  code: number;
  name: string;

  constructor(code: number) {
    const error = new Error();
    this.name = 'FetchError';
    this.code = code;

    Error.captureStackTrace(error, FetchError);
  }
}

export const getRecent = async (): Promise<Entry[]> => {
  try {
  } catch (e) { console.log(e)}
  const req = {
    headers: {
      cookie: headers().get('cookie'),
    },
  };
  
  const { Auth, API } = withSSRContext({ req });
  const session = await Auth.currentSession();
  const token = session.getIdToken();
  const jwt = token.getJwtToken();
  console.log(jwt)

  const init = {
    headers: {
      Authorization: jwt
    }
  };
  const response = await fetch(`https://api.aleks.tech/journal-development/recent`, init);
  console.log(response.status);
  if (response.status > 299) {
    throw new FetchError(response.status);
  }

  const parsed = await response.json();
  if (parsed) {
    const { Items } = parsed;
    if (Array.isArray(Items)) {
      return Items;
    }
  }

  throw new FetchError(500);
};



export const meta = {
  title: "Entries",
  description: "Journal entries",
  summary: "All entries",
  image: "",
  imageAlt: "" // max 420 characters for Twitter
};

export async function getEntries(context:GetServerSidePropsContext) {
  let entries: Entry[] = [];
  let ssrLoaded = false;

  try {
    const init = {
      headers: {
        Authorization: cookies().get("Authorization")
      }
    };
    const data = await getRecent();
    entries = data;
    ssrLoaded = true;
  } catch (e: unknown) {
    if (e instanceof FetchError && e.code === 401) { // move to middleware
      const cookies = cookie.serialize("after-login", "destination", {
        path: "/",
        httpOnly: false,
        maxAge: 60 * 60 // 1 hour
      });
      // context.res.setHeader('set-cookie', cookies);
      // redirect('/auth/login');
    }
  }

  return entries;
};

interface EntriesProps {
  entries: Entry[]
  ssrLoaded: boolean
}

const Entries = async ({ ssrLoaded }: EntriesProps) => {
  const entries = await getEntries();
  // const [loading, setLoading] = useState(false);
  // const [failed, setFailed] = useState(false);
  // const [entries, setList] = useState(entries);

  // async function loadData() {
  //   try {
  //     setLoading(true);
  //     const data: Entry[] = await getRecent({ withAuth: true});
  //     setList(data);
  //   } catch {
  //     setFailed(true);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  // useEffect(() => {
  //   if (!ssrLoaded) {
  //     loadData();
  //   }
  // }, []);

  return (
    <div>
      <div>
        <h1>Notes</h1>
        <PrefetchedLink href="/posts">
          Posts
        </PrefetchedLink>
        <PrefetchedLink href="/journal/new">
          Create
        </PrefetchedLink>
        {/* {loading &&
          <p>Loading</p>
        }
        {failed &&
          <>
            <p>There was an error</p>
            <button>Retry</button>
          </>
        }
        {!failed && !loading && !entries.length &&
          <p>Your notes will appear here</p>
        } */}
        {/* {!failed && !loading && entries.length &&
        } */}
        <div>
          {
            entries.map(({ EntryBody, EntryId }) => (
              <div key={EntryBody}>
                <p>
                  {EntryBody}
                </p>
                <div>
                  <PrefetchedLink href={`/journal/${EntryId}`}>
                    Edit
                  </PrefetchedLink>
                  <PrefetchedLink href={`/journal/${EntryId}/delete`}>
                    Delete
                  </PrefetchedLink>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default Entries;
