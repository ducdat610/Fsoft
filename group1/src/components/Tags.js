import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export const api = "https://api.realworld.io/api/tags";

function Tag() {
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(api);
        if (response.status === 200) {
          setTags(response.data.tags);
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
  };

  return (
    <div className='container'>
      <div className='Tag-bg d-none d-md-block'>
        <h2>Popular Tags:</h2>
        <div className='tags'>
          {tags.map(tag => (
            <Link id='link' key={tag} to={`/tag/${tag}`} className='tag' onClick={() => handleTagClick(tag)}>
              {tag}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Tag;
