import { MDXRemote as MdxRemoteRender } from 'next-mdx-remote/rsc'
 
export default async function MDXRemote({ markdown }: { markdown: string }) {
  return <MdxRemoteRender source={markdown} />
}