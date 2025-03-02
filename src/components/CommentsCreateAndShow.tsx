"use client";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

interface CommentsCreateAndShowProps {
  _id: string;
}

export interface CommentType {
  _id: string;
  postId: string;
  userName: string;
  email: string;
  comment: string;
  createdAt: string;
}

const CommentsCreateAndShow: React.FC<CommentsCreateAndShowProps> = ({ _id }) => {
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [showComments, setShowComments] = useState<CommentType[]>([]);

  const PostUrl = process.env.NEXT_PUBLIC_MAIN_URL;

  const fetchComments = useCallback(() => {
    axios
      .get(`${PostUrl}/posts/${_id}`)
      .then((response) => {
        const sortedComments = (response.data || []).sort(
          (a: CommentType, b: CommentType) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setShowComments(sortedComments);
      })
      .catch((error) =>
        console.error("Error fetching comments:", error)
      );
  }, [PostUrl, _id]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const commentSubmit = () => {

    axios
      .post(`${PostUrl}/comments`, {
        postId: _id,
        userName,
        email,
        comment,
      })
      .then((response) => {
        setShowComments((prev) => [response.data, ...prev]);
        setUserName("");
        setEmail("");
        setComment("");
      })
      .catch((error) =>
        console.error("Error posting comment:", error)
      );
  };

  return (
    <div className="pt-10 flex flex-col space-y-3">
      <div>
        <h1 className="bg-[#25E064] p-3 rounded-2xl inline-block text-white font-bold text-2xl md:text-4xl capitalize">
          Comments
        </h1>
        <hr className="mt-4" />
      </div>

      <div className="flex flex-col md:items-center lg:items-start">
        <form
          className="flex flex-col md:w-4/6 space-y-2"
          onSubmit={commentSubmit}
        >
          <input
            className="px-3 py-1 outline-none rounded-lg ring-1 ring-green-500/20 focus:ring-green-500"
            type="text"
            name="userName"
            placeholder="Your Name"
            required
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />

          <input
            className="px-3 py-1 outline-none rounded-lg ring-1 ring-green-500/20 focus:ring-green-500"
            type="email"
            name="email"
            placeholder="Your Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <textarea
            className="px-3 py-1 outline-none rounded-lg ring-1 ring-green-500/20 focus:ring-green-500"
            name="comment"
            placeholder="Your Comment"
            required
            rows={7}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>

          <div className="pt-3">
            <button
              className="font-semibold uppercase hover:bg-[#27ae54] hover:shadow-md hover:shadow-black transition-all duration-150 bg-[#25E064] lg:inline-block w-full lg:w-auto rounded-2xl px-5 py-1 text-white text-lg"
              type="submit"
            >
              Post
            </button>
          </div>
        </form>
      </div>

      <div className="pt-12 space-y-3">
        {showComments.length > 0 ? (
          showComments.map((cmt) => (
            <div key={cmt._id} className="py-2 space-y-2">
              <p className="font-bold flex flex-col space-y-1">
                <span>
                  <span className="inline-block bg-[#4a594c] text-white rounded-2xl px-2 py-[2px]">
                    {cmt.userName}
                  </span>
                </span>
                <span className="text-xs text-gray-500">
                  {new Date(cmt.createdAt).toLocaleString()}
                </span>
              </p>
              <p className="text-lg font-serif">{cmt.comment}</p>
            </div>
          ))
        ) : (
          <p>No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
};

export default CommentsCreateAndShow;
