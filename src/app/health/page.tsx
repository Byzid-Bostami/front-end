import React from "react";
import Link from "next/link";
import PostsFetch from "@/components/PostsFetch";
import DOMPurify from "isomorphic-dompurify";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";

const page = async () => {
  const postsdata = await PostsFetch();

  const recentPosts = [...postsdata].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  const publicPosts = recentPosts.filter((post) => post.status === "public");
  const healthPosts = publicPosts.filter((post) => post.category === "health");
  const firstPost = healthPosts[0];
  const otherHealthPosts = healthPosts.slice(1);

  const createMarkup = (htmlContent: string): { __html: string } => {
    return {
      __html: DOMPurify.sanitize(htmlContent),
    };
  };

  return (
    <div className="space-y-10 pb-10">
      {/* first post section */}
      <div>
        {firstPost ? (
          <Link href={`/post/${firstPost._id}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 shadow hover:shadow-md transition-all duration-150 hover:shadow-black hover:scale-95 shadow-black/60 rounded-lg">
              <Image
                src={firstPost.photo}
                alt={firstPost.title}
                unoptimized
                width={800}
                height={600}
                className="md:rounded-l-lg h-full rounded-t-lg md:rounded-tr-none"
              />
              <div className="p-4 md:-ml-1 md:rounded-r-lg rounded-b-lg md:rounded-b-none bg-[#25e064] justify-center flex flex-col space-y-1">
                <div>
                  <p className="font-semibold capitalize bg-green-600 text-white px-3 rounded-2xl inline-block ">
                    {firstPost.category}
                  </p>
                </div>
                <h2 className="text-2xl md:text-4xl capitalize font-bold">
                  {firstPost.title}
                </h2>

                <p className="text-sm font-medium text-white">
                  {formatDistanceToNow(new Date(firstPost.createdAt), {
                    addSuffix: true,
                  })}
                </p>
                <p
                  className="pt-2 text-base first-letter:text-xl first-letter:font-medium"
                  dangerouslySetInnerHTML={createMarkup(
                    firstPost.description.length > 250
                      ? firstPost.description.slice(0, 250) + "..."
                      : firstPost.description
                  )}
                ></p>
              </div>
            </div>
          </Link>
        ) : (
          <p>No public posts available.</p>
        )}
      </div>

      {/* all other feature posts */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
        {otherHealthPosts.length > 0 ? (
          otherHealthPosts.map((post) => (
            <Link href={`/post/${post._id}`} key={post._id}>
              <div className="flex flex-col space-y-2 shadow shadow-black/10 h-full hover:shadow-md hover:shadow-black/50 hover:scale-95 transition-all duration-150 rounded-md">
                <Image
                  src={post.photo}
                  alt={post.title}
                  unoptimized
                  width={800}
                  height={200}
                  className="object-cover w-full md:h-[200px] rounded-lg"
                />
                <div className="p-2 space-y-1">
                  <p className="text-sm font-medium text-[#00C298] capitalize">
                    {post.category}
                  </p>
                  <p className="text-sm font-medium">
                    {formatDistanceToNow(new Date(post.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                  <h2 className="text-lg font-bold capitalize">{post.title}</h2>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>No feature posts available.</p>
        )}
      </div>
    </div>
  );
};

export default page;
