import axios from "axios";

const PostsFetch = async() => {
    const postUrl = process.env.NEXT_PUBLIC_MAIN_URL;

    if (!postUrl) {
      throw new Error("API url is not defined");
    }
  
    try {
      const response = await axios.get(`${postUrl}/posts`);
      return response.data || [];
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error fetching data:', error.message);
        throw new Error('Failed to fetch data');
      } else {
        console.error('Unexpected error:', error);
        throw new Error('An unexpected error occurred');
      }
    }
}

export default PostsFetch;