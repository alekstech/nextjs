import { recent as resource } from './resources';
import addAuth from './addAuth';

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

type Args = {
  init?: RequestInit;
  withAuth?: boolean;
}

export const getRecent = async ({ init, withAuth }: Args): Promise<Entry[]> => {
  if (withAuth) {
    init = await addAuth(init = {});
  }

  const response = await fetch(resource, init);

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

export default getRecent;
