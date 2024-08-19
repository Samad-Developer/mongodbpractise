// pages/index.tsx (or your desired homepage file)
import prisma from '@/lib/prisma';
import CreatePost from '@/components/CreatePost';
interface Post {
  id: number;
  title: string;
  userId: number;
  // Add other fields as needed
}

export default async function HomePage() {


  
  const posts = await prisma.post.findMany();

  console.log('see what;s happing', posts)
  
  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       setIsLoading(true);
  //       const response = await axios.get('/api/createPost'); // Adjust path if necessary
  //       setPosts(response.data);
  //     } catch (error) {
  //       console.error('Error fetching posts:', error);
  //       setError('Failed to fetch posts');
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchPosts();
  // }, []);



  return (
    <div>
     
      <div className='flex flex-col '>
      <h2>Create a New Post</h2>
      <CreatePost/>
      </div>
      <h1>Latest Posts</h1>
      
        <ul>
          {posts.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      
    </div>
  );
}