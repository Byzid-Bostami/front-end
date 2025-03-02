"use client";
import React, { useEffect, useState, Suspense } from "react"; // Import Suspense
import Link from "next/link";
import PostsFetch from "@/components/PostsFetch";
import { formatDistanceToNow } from "date-fns";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

interface Post {
  _id: string;
  createdAt: string;
  status: string;
  title: string;
  photo: string;
  category: string;
}

const Page: React.FC = () => {
  return (
    <Suspense fallback={<div><Image src={'/loading.gif'} alt="loading" height={100} width={100} /></div>}>
      <SearchPageContent />
    </Suspense>
  );
};

const SearchPageContent: React.FC = () => {
  const searchParams = useSearchParams();
  const query = searchParams?.get("query") || "";

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data: Post[] = await PostsFetch();
      setPosts(data);
    };
    fetchData();
  }, []);

  const recentPosts = [...posts].sort(
    (a: Post, b: Post) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const publicPosts = recentPosts.filter((post) => post.status === "public");

  const filteredPosts = query
    ? publicPosts.filter((post) =>
        post.title.toLowerCase().includes(query.toLowerCase())
      )
    : publicPosts;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 py-10 -mt-4 items-stretch">
      {filteredPosts.length > 0 ? (
        filteredPosts.map((post: Post) => (
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
        <p>
          No posts are available for the result
          <span className="font-semibold">{query}</span>
        </p>
      )}
    </div>
  );
};

export default Page;
