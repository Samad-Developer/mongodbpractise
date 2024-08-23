// pages/index.tsx (or your desired homepage file)
import prisma from '@/lib/prisma';
import CreatePost from '@/components/CreatePost';
import CreateImage from '@/components/CreateImage'
export default async function HomePage() {
  interface Product {
    id: string;
    name: string;
    price: number;
    imageUrl?: string;
    createdAt: string;
  }
  const posts = await prisma.post.findMany();
  const products = await prisma.product.findMany();
  return (
    <div>
     
      <div className='flex flex-col '>
      <h2>Create a New Post</h2>
      <CreatePost/>
      <CreateImage/>
      <h1>Products</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {products.map((product) => (
          <div key={product.id} style={{ border: '1px solid #ccc', padding: '16px', borderRadius: '8px', maxWidth: '200px' }}>
            <h2>{product.name}</h2>
            <p>Price: ${product.price.toFixed(2)}</p>
            {product.imageUrl && (
              <img
                src={product.imageUrl}
                alt={product.name}
                style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
              />
            )}
            <p>Created At: {new Date(product.createdAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
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