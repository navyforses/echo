import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAuthorById } from '../../data/authors';
import VintageBook from '../../components/VintageBook';

const VintageBookPage: React.FC = () => {
  const { authorId } = useParams<{ authorId: string }>();
  const navigate = useNavigate();
  
  const author = authorId ? getAuthorById(authorId) : null;

  if (!author) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black to-chocolate-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-gold-400 mb-4 font-georgian">ავტორი ვერ მოიძებნა</h1>
          <button
            onClick={() => navigate('/library')}
            className="px-6 py-3 bg-gold-600 text-white rounded-lg hover:bg-gold-700 transition-colors font-georgian"
          >
            ბიბლიოთეკაში დაბრუნება
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen">
      <VintageBook author={author} />
    </div>
  );
};

export default VintageBookPage; 