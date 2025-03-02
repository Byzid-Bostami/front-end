import PostsFetch from "@/components/PostsFetch";
import DOMPurify from "isomorphic-dompurify";
import { formatDistanceToNow } from "date-fns";
import CommentsCreateAndShow from "@/components/CommentsCreateAndShow";
import Image from 'next/image';

interface Post {
  _id?: string;
  title: string;
  description: string;
  photo: string;
  status: string;
  createdAt: string;
  category: string;
}

function createMarkup(html: string): { __html: string } {
  return { __html: DOMPurify.sanitize(html) };
}

export async function generateMetadata({params}: {params: Promise<{ _id: string }>}) {
  const { _id } = await params;
  const postsData: Post[] = await PostsFetch();
  const publicPosts = postsData.filter((post) => post.status === "public");

  const mainPost = publicPosts.find((post) => post._id === _id);

  if (!mainPost) {
    return {
      title: "Post not found",
      description: "The post you are looking for does not exist.",
    };
  }

  return {
    title: mainPost.title,
    description: mainPost.description,
    openGraph: {
      title: mainPost.title,
      description: mainPost.description,
      images: mainPost.photo,
    },
  };
}

export default async function Page({params}: {params: Promise<{ _id: string }>}) {
  const { _id } = await params;
  const postsData: Post[] = await PostsFetch();
  const publicPosts = postsData.filter((post) => post.status === "public");

  const mainPost = publicPosts.find((post) => post._id === _id);

  if (!mainPost) {
    return <div>Post not found</div>;
  }

  return (
    <div className="py-10 -mt-5 min-h-screen">
      <div className="flex flex-col space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 shadow shadow-black/20 rounded-lg">
        <Image
            src={mainPost.photo}
            alt={mainPost.title}
            width={400}
            height={400}
            unoptimized
            className="md:rounded-l-lg h-full w-full rounded-t-lg md:rounded-tr-none"
          />
          <div className="p-4 md:-ml-1 md:rounded-r-lg rounded-b-lg md:rounded-b-none bg-[#25e064] justify-center flex flex-col space-y-1">
            <div>
              <p className="font-semibold capitalize bg-green-600 text-white px-3 rounded-2xl inline-block">
                {mainPost.category}
              </p>
            </div>
            <h2 className="text-2xl md:text-4xl xl:text-5xl capitalize font-bold">
              {mainPost.title}
            </h2>
            <div>
              <p className="text-sm font-medium text-white">
                {formatDistanceToNow(new Date(mainPost.createdAt), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </div>
        </div>

        <div className="md:px-7 lg:px-12">
          <p
            className="pt-2 text-base first-letter:text-xl first-letter:font-medium"
            dangerouslySetInnerHTML={createMarkup(mainPost.description)}
          ></p>
        </div>

        <div className="md:px-6 lg:px-11">
          <CommentsCreateAndShow _id={_id} />
        </div>
      </div>
    </div>
  );
}
