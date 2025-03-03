import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaCalendarAlt, FaUser, FaTag, FaSearch } from 'react-icons/fa';

import LoadingSpinner from '../../../core/components/LoadingSpinner';
import ErrorMessage from '../../../core/components/ErrorMessage';

const BlogContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const BlogHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const BlogTitle = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin: 0 0 15px 0;
`;

const BlogSubtitle = styled.p`
  color: #666;
  font-size: 1.1rem;
  max-width: 700px;
  margin: 0 auto;
`;

const BlogContent = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const BlogPosts = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const BlogPost = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const PostImage = styled.div`
  height: 200px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s;
  }
  
  ${BlogPost}:hover & img {
    transform: scale(1.05);
  }
`;

const PostContent = styled.div`
  padding: 20px;
`;

const PostTitle = styled.h3`
  font-size: 1.2rem;
  margin: 0 0 10px 0;
  
  a {
    color: #333;
    text-decoration: none;
    
    &:hover {
      color: #0066cc;
    }
  }
`;

const PostMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 15px;
  font-size: 0.85rem;
  color: #666;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 5px;
    color: #0066cc;
  }
`;

const PostExcerpt = styled.p`
  color: #666;
  margin: 0 0 15px 0;
  line-height: 1.6;
`;

const ReadMore = styled.a`
  display: inline-block;
  color: #0066cc;
  font-weight: 500;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const Sidebar = styled.div`
  @media (max-width: 768px) {
    order: -1;
  }
`;

const SidebarWidget = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 30px;
`;

const WidgetTitle = styled.h3`
  font-size: 1.2rem;
  color: #333;
  margin: 0 0 20px 0;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
`;

const SearchForm = styled.form`
  display: flex;
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 15px;
  padding-right: 45px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
  
  &:focus {
    outline: none;
    border-color: #0066cc;
  }
`;

const SearchButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 45px;
  background: none;
  border: none;
  color: #0066cc;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CategoryList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const CategoryItem = styled.li`
  margin-bottom: 10px;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  a {
    display: flex;
    justify-content: space-between;
    color: #666;
    text-decoration: none;
    padding: 8px 0;
    
    &:hover {
      color: #0066cc;
    }
  }
`;

const CategoryCount = styled.span`
  background-color: #f5f5f5;
  color: #666;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 0.8rem;
`;

const RecentPostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const RecentPost = styled.div`
  display: flex;
  gap: 10px;
`;

const RecentPostImage = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 4px;
  overflow: hidden;
  flex-shrink: 0;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const RecentPostInfo = styled.div`
  flex: 1;
`;

const RecentPostTitle = styled.h4`
  font-size: 0.9rem;
  margin: 0 0 5px 0;
  
  a {
    color: #333;
    text-decoration: none;
    
    &:hover {
      color: #0066cc;
    }
  }
`;

const RecentPostDate = styled.div`
  font-size: 0.8rem;
  color: #666;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 5px;
    font-size: 0.7rem;
  }
`;

const TagCloud = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Tag = styled.a`
  display: inline-block;
  padding: 5px 12px;
  background-color: #f5f5f5;
  color: #666;
  border-radius: 4px;
  font-size: 0.85rem;
  text-decoration: none;
  transition: all 0.3s;
  
  &:hover {
    background-color: #0066cc;
    color: #fff;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
`;

const PageButton = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
  border: 1px solid ${props => props.active ? '#0066cc' : '#ddd'};
  background-color: ${props => props.active ? '#0066cc' : '#fff'};
  color: ${props => props.active ? '#fff' : '#666'};
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    border-color: #0066cc;
    color: ${props => props.active ? '#fff' : '#0066cc'};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock data for blog posts
  const mockPosts = [
    {
      id: 1,
      title: 'Top 10 Office Supplies Every Professional Needs',
      excerpt: 'Discover the essential office supplies that every professional should have on their desk to maximize productivity and efficiency.',
      image: 'https://via.placeholder.com/600x400?text=Office+Supplies',
      date: '2023-03-15',
      author: 'John Smith',
      category: 'Office Essentials',
      tags: ['office', 'productivity', 'supplies']
    },
    {
      id: 2,
      title: 'How to Organize Your Workspace for Maximum Productivity',
      excerpt: 'Learn the best practices for organizing your workspace to reduce clutter, minimize distractions, and boost your productivity.',
      image: 'https://via.placeholder.com/600x400?text=Workspace+Organization',
      date: '2023-03-10',
      author: 'Jane Doe',
      category: 'Productivity',
      tags: ['organization', 'productivity', 'workspace']
    },
    {
      id: 3,
      title: 'The Evolution of Office Stationery: From Quills to Digital Pens',
      excerpt: 'Explore the fascinating history of office stationery and how it has evolved over centuries to meet the changing needs of professionals.',
      image: 'https://via.placeholder.com/600x400?text=Stationery+Evolution',
      date: '2023-03-05',
      author: 'David Johnson',
      category: 'History',
      tags: ['history', 'stationery', 'technology']
    },
    {
      id: 4,
      title: 'Sustainable Office Supplies: Eco-Friendly Alternatives',
      excerpt: 'Discover eco-friendly alternatives to traditional office supplies and learn how to make your workspace more sustainable.',
      image: 'https://via.placeholder.com/600x400?text=Sustainable+Supplies',
      date: '2023-02-28',
      author: 'Emily Green',
      category: 'Sustainability',
      tags: ['eco-friendly', 'sustainability', 'green-office']
    },
    {
      id: 5,
      title: 'Digital vs. Paper: Finding the Right Balance in Modern Offices',
      excerpt: 'Explore the pros and cons of digital and paper-based workflows, and learn how to find the right balance for your specific needs.',
      image: 'https://via.placeholder.com/600x400?text=Digital+vs+Paper',
      date: '2023-02-20',
      author: 'Michael Brown',
      category: 'Digital Transformation',
      tags: ['digital', 'paper', 'workflow']
    },
    {
      id: 6,
      title: 'The Psychology of Color in Office Supplies',
      excerpt: 'Learn how different colors in your office supplies can affect your mood, productivity, and creativity throughout the workday.',
      image: 'https://via.placeholder.com/600x400?text=Color+Psychology',
      date: '2023-02-15',
      author: 'Sarah Wilson',
      category: 'Psychology',
      tags: ['color', 'psychology', 'productivity']
    }
  ];
  
  // Mock data for categories
  const categories = [
    { name: 'Office Essentials', count: 12 },
    { name: 'Productivity', count: 8 },
    { name: 'Technology', count: 15 },
    { name: 'Sustainability', count: 6 },
    { name: 'Digital Transformation', count: 9 },
    { name: 'History', count: 4 },
    { name: 'Psychology', count: 7 }
  ];
  
  // Mock data for tags
  const tags = [
    'office', 'productivity', 'supplies', 'organization', 'workspace',
    'history', 'stationery', 'technology', 'eco-friendly', 'sustainability',
    'green-office', 'digital', 'paper', 'workflow', 'color', 'psychology'
  ];
  
  // Fetch posts on component mount
  useEffect(() => {
    const fetchPosts = () => {
      setLoading(true);
      setError(null);
      
      // Simulate API call with timeout
      setTimeout(() => {
        try {
          setPosts(mockPosts);
        } catch (err) {
          setError('Failed to load blog posts. Please try again later.');
          console.error('Error fetching posts:', err);
        } finally {
          setLoading(false);
        }
      }, 1000);
    };
    
    fetchPosts();
  }, [mockPosts]);
  
  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm);
    // Here you would typically filter posts or make an API call
  };
  
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  if (loading) {
    return (
      <BlogContainer>
        <BlogHeader>
          <BlogTitle>Our Blog</BlogTitle>
        </BlogHeader>
        <LoadingSpinner />
      </BlogContainer>
    );
  }
  
  if (error) {
    return (
      <BlogContainer>
        <BlogHeader>
          <BlogTitle>Our Blog</BlogTitle>
        </BlogHeader>
        <ErrorMessage message={error} />
      </BlogContainer>
    );
  }
  
  return (
    <BlogContainer>
      <BlogHeader>
        <BlogTitle>Our Blog</BlogTitle>
        <BlogSubtitle>
          Stay updated with the latest news, tips, and insights about office supplies and productivity.
        </BlogSubtitle>
      </BlogHeader>
      
      <BlogContent>
        <BlogPosts>
          {posts.map(post => (
            <BlogPost key={post.id}>
              <PostImage>
                <img src={post.image} alt={post.title} />
              </PostImage>
              
              <PostContent>
                <PostTitle>
                  <a href={`/blog/${post.id}`}>{post.title}</a>
                </PostTitle>
                
                <PostMeta>
                  <MetaItem>
                    <FaCalendarAlt />
                    {formatDate(post.date)}
                  </MetaItem>
                  
                  <MetaItem>
                    <FaUser />
                    {post.author}
                  </MetaItem>
                  
                  <MetaItem>
                    <FaTag />
                    {post.category}
                  </MetaItem>
                </PostMeta>
                
                <PostExcerpt>{post.excerpt}</PostExcerpt>
                
                <ReadMore href={`/blog/${post.id}`}>
                  Read More
                </ReadMore>
              </PostContent>
            </BlogPost>
          ))}
        </BlogPosts>
        
        <Sidebar>
          <SidebarWidget>
            <WidgetTitle>Search</WidgetTitle>
            <SearchForm onSubmit={handleSearch}>
              <SearchInput
                type="text"
                placeholder="Search blog..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <SearchButton type="submit">
                <FaSearch />
              </SearchButton>
            </SearchForm>
          </SidebarWidget>
          
          <SidebarWidget>
            <WidgetTitle>Categories</WidgetTitle>
            <CategoryList>
              {categories.map(category => (
                <CategoryItem key={category.name}>
                  <a href={`/blog/category/${category.name.toLowerCase().replace(' ', '-')}`}>
                    {category.name}
                    <CategoryCount>{category.count}</CategoryCount>
                  </a>
                </CategoryItem>
              ))}
            </CategoryList>
          </SidebarWidget>
          
          <SidebarWidget>
            <WidgetTitle>Recent Posts</WidgetTitle>
            <RecentPostList>
              {posts.slice(0, 3).map(post => (
                <RecentPost key={post.id}>
                  <RecentPostImage>
                    <img src={post.image} alt={post.title} />
                  </RecentPostImage>
                  
                  <RecentPostInfo>
                    <RecentPostTitle>
                      <a href={`/blog/${post.id}`}>{post.title}</a>
                    </RecentPostTitle>
                    
                    <RecentPostDate>
                      <FaCalendarAlt />
                      {formatDate(post.date)}
                    </RecentPostDate>
                  </RecentPostInfo>
                </RecentPost>
              ))}
            </RecentPostList>
          </SidebarWidget>
          
          <SidebarWidget>
            <WidgetTitle>Tags</WidgetTitle>
            <TagCloud>
              {tags.map(tag => (
                <Tag key={tag} href={`/blog/tag/${tag}`}>
                  {tag}
                </Tag>
              ))}
            </TagCloud>
          </SidebarWidget>
        </Sidebar>
      </BlogContent>
      
      <Pagination>
        <PageButton disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
          &lt;
        </PageButton>
        
        {[1, 2, 3].map(page => (
          <PageButton
            key={page}
            active={currentPage === page}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </PageButton>
        ))}
        
        <PageButton onClick={() => setCurrentPage(currentPage + 1)}>
          &gt;
        </PageButton>
      </Pagination>
    </BlogContainer>
  );
};

export default BlogPage;
