import Head from "next/head";
import Link from "next/link";
import PostsFetch from "@/components/PostsFetch";
import DOMPurify from "isomorphic-dompurify";
import Image from 'next/image';


export default async function Home() {
  const postsdata = await PostsFetch();

  const recentPosts = [...postsdata].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const publicPosts = recentPosts.filter((post) => post.status === "public");
  const firstPublicPost = publicPosts[0];
  const recentPublicPosts = publicPosts.slice(1, 7);


  const featurePosts = publicPosts.filter((post)=> post.featurePost === true );
  const LemitedFeaturePost = featurePosts.slice(0, 4);


  const news = publicPosts.filter((post)=> post.category === 'news' );
  const LemitedNews = news.slice(0, 4);


  const tech = publicPosts.filter((post)=> post.category === 'tech' );
  const LemitedTech = tech.slice(0, 4);


  const health = publicPosts.filter((post)=> post.category === 'health' );
  const LemitedHealth = health.slice(0, 4);



  const createMarkup = (htmlContent: string): { __html: string } => {
    return {
      __html: DOMPurify.sanitize(htmlContent),
    };
  };

  return (
    <div className="space-y-10 pb-10">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Recent posts section */}
      <div className="grid gap-5 lg:grid-cols-3 grid-cols-1 items-stretch">
        {/* Main Post Column */}
        <div className="lg:col-span-2 col-span-1 h-full">
          {firstPublicPost ? (
            <Link href={`/post/${firstPublicPost._id}`}>
              <div className="cursor-pointer flex flex-col justify-center space-y-1 shadow hover:shadow-md hover:scale-95 hover:shadow-black transition-all duration-150 shadow-black/30 rounded-lg h-full">
              <Image
                  src={firstPublicPost.photo}
                  alt={firstPublicPost.title}
                  unoptimized
                  width={800}  
                  height={600}
                  className="rounded-t-lg h-full w-full"
                />
                <div className="p-3">
                  <p className="font-medium text-[#00C298] capitalize">
                    {firstPublicPost.category}
                  </p>
                  <h2 className="text-2xl capitalize font-bold">
                    {firstPublicPost.title}
                  </h2>
                  <p
                    className="pt-2 text-stone-700 text-base first-letter:text-xl first-letter:font-medium"
                    dangerouslySetInnerHTML={createMarkup(
                      firstPublicPost.description.length > 230
                        ? firstPublicPost.description.slice(0, 230) + "..."
                        : firstPublicPost.description
                    )}
                  ></p>
                </div>
              </div>
            </Link>
          ) : (
            <p>No public posts available.</p>
          )}
        </div>

        {/* Recent Posts List Column */}
        <div className="flex flex-col space-y-4 h-full">
          <h1 className="text-xl font-bold uppercase">Recent posts</h1>
          <hr />
          {recentPublicPosts.length > 0 ? (
            recentPublicPosts.map((post) => (
              <Link href={`/post/${post._id}`} key={post._id}>
                <div className="flex items-center lg:justify-between box-border space-x-4 cursor-pointer shadow shadow-black/10 hover:shadow-md hover:shadow-black/50 hover:scale-95 p-2 rounded-lg transition-all duration-150">
                <Image
                  src={post.photo}
                  alt={post.title}
                  unoptimized
                  width={64}  
                  height={64}
                  className="object-cover w-16 h-16 rounded-lg"
                />
                  <div>
                    <p className="text-sm font-medium text-[#00C298] capitalize">
                      {post.category}
                    </p>
                    <h2 className="text-lg font-bold capitalize">
                      {post.title}
                    </h2>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p>No recent posts available.</p>
          )}
        </div>
      </div>



          {/* feature posts section */}

      <div className="space-y-6">

       <div>
       <h1 className="text-xl font-bold uppercase pb-2">feature posts</h1>
       <hr />
       </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
        {LemitedFeaturePost.length > 0 ? (
            LemitedFeaturePost.map((post) => (
              <Link href={`/post/${post._id}`} key={post._id}>
                <div className="flex flex-col space-y-2 shadow shadow-black/10 h-full hover:shadow-md hover:shadow-black/50 hover:scale-95 transition-all duration-150 rounded-md" >
                <Image
                    src={post.photo}
                    alt={post.title}
                    unoptimized
                    width={800}  
                    height={160}
                    className="object-cover w-full md:h-[160px]  rounded-lg"
                  />
                  <div className="p-2">
                    <p className="text-sm font-medium text-[#00C298] capitalize">
                      {post.category}
                    </p>
                    <h2 className="text-lg font-bold capitalize">
                      {post.title}
                    </h2>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p>No feature posts available.</p>
          )}

        </div>
      </div>    


      {/* news posts section */}

      <div className="space-y-6">

       <div>
       <h1 className="text-xl font-bold uppercase pb-2">latest news</h1>
       <hr />
       </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
        {LemitedNews.length > 0 ? (
            LemitedNews.map((post) => (
              <Link href={`/post/${post._id}`} key={post._id}>
                <div className="flex flex-col space-y-2 shadow shadow-black/10 h-full hover:shadow-md hover:shadow-black/50 hover:scale-95 transition-all duration-150 rounded-md" >
                <Image
                    src={post.photo}
                    alt={post.title}
                    unoptimized
                    width={800}  
                    height={160}
                    className="object-cover w-full md:h-[160px]  rounded-lg"
                  />
                  <div className="p-2">
                    <p className="text-sm font-medium text-[#00C298] capitalize">
                      {post.category}
                    </p>
                    <h2 className="text-lg font-bold capitalize">
                      {post.title}
                    </h2>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p>No news posts available.</p>
          )}

        </div>
      </div>


      {/* tech posts section */}

      <div className="space-y-6">

       <div>
       <h1 className="text-xl font-bold uppercase pb-2">tech posts</h1>
       <hr />
       </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
        {LemitedTech.length > 0 ? (
            LemitedTech.map((post) => (
              <Link href={`/post/${post._id}`} key={post._id}>
                <div className="flex flex-col space-y-2 shadow shadow-black/10 h-full hover:shadow-md hover:shadow-black/50 hover:scale-95 transition-all duration-150 rounded-md" >
                <Image
                    src={post.photo}
                    alt={post.title}
                    unoptimized
                    width={800}  
                    height={160}
                    className="object-cover w-full md:h-[160px]  rounded-lg"
                  />
                  <div className="p-2">
                    <p className="text-sm font-medium text-[#00C298] capitalize">
                      {post.category}
                    </p>
                    <h2 className="text-lg font-bold capitalize">
                      {post.title}
                    </h2>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p>No tech posts available.</p>
          )}

        </div>
      </div>


      {/* health posts section */}

      <div className="space-y-6">

       <div>
       <h1 className="text-xl font-bold uppercase pb-2">health posts</h1>
       <hr />
       </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
        {LemitedHealth.length > 0 ? (
            LemitedHealth.map((post) => (
              <Link href={`/post/${post._id}`} key={post._id}>
                <div className="flex flex-col space-y-2 shadow shadow-black/10 h-full hover:shadow-md hover:shadow-black/50 hover:scale-95 transition-all duration-150 rounded-md" >
                <Image
                    src={post.photo}
                    alt={post.title}
                    unoptimized
                    width={800}  
                    height={160}
                    className="object-cover w-full md:h-[160px]  rounded-lg"
                  />
                  <div className="p-2">
                    <p className="text-sm font-medium text-[#00C298] capitalize">
                      {post.category}
                    </p>
                    <h2 className="text-lg font-bold capitalize">
                      {post.title}
                    </h2>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p>No health posts available.</p>
          )}

        </div>
      </div>

    </div>
  );
}
