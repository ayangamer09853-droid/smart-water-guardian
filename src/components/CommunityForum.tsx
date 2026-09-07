import React, { useState } from 'react';
import { useFarmContext } from '../context/FarmContext';
import { MOCK_FORUM_POSTS } from '../data/mockData';
import type { ForumPost } from '../types';
import { Users, ThumbsUp, MessageSquare, Tag, Plus, Send } from 'lucide-react';

export const CommunityForum: React.FC = () => {
  const { showNotification } = useFarmContext();
  const [posts, setPosts] = useState<ForumPost[]>(MOCK_FORUM_POSTS);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = ['All', 'Irrigation', 'Pests', 'Weather', 'Subsidies'];

  const filteredPosts = activeCategory === 'All' 
    ? posts 
    : posts.filter(p => p.category === activeCategory);

  const handleLike = (id: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === id) return { ...p, likes: p.likes + 1 };
      return p;
    }));
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const post: ForumPost = {
      id: `post-${Date.now()}`,
      author: 'Farmer User',
      authorRole: 'Community Member',
      location: 'Ludhiana, Punjab',
      avatar: '👨‍🌾',
      title: newTitle.trim(),
      content: newContent.trim(),
      category: 'Irrigation',
      likes: 1,
      repliesCount: 0,
      timestamp: 'Just now',
      tags: ['SmartWaterGuardian', 'FarmCommunity'],
    };

    setPosts([post, ...posts]);
    setNewTitle('');
    setNewContent('');
    setIsModalOpen(false);
    showNotification('Your discussion post has been published to the community!');
  };

  return (
    <div className="space-y-8 py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900/90 border border-slate-800 p-6 rounded-2xl">
        <div>
          <div className="flex items-center gap-2">
            <Users className="w-7 h-7 text-emerald-400" />
            <h1 className="text-2xl font-bold text-white">Farmer Community & Knowledge Exchange</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Connect with 12,000+ farmers, agronomists, FPOs & water conservation specialists across India.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="agri-button-primary px-4 py-2.5 text-xs flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Ask Question / Share Tip</span>
        </button>
      </div>

      {/* CATEGORY FILTERS */}
      <div className="flex flex-wrap gap-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeCategory === cat
                ? 'bg-agri-600 text-white shadow-lg shadow-agri-900/40'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* POSTS LIST */}
      <div className="space-y-6">
        {filteredPosts.map(post => (
          <div key={post.id} className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xl">
                  {post.avatar}
                </div>
                <div>
                  <div className="text-sm font-bold text-white flex items-center gap-2">
                    <span>{post.author}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-normal">
                      {post.location}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400">{post.authorRole} • {post.timestamp}</div>
                </div>
              </div>

              <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-slate-800 text-aqua-400 border border-slate-700">
                {post.category}
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-base font-bold text-slate-100">{post.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{post.content}</p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, idx) => (
                <span key={idx} className="text-[10px] text-slate-400 flex items-center gap-1 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                  <Tag className="w-3 h-3 text-emerald-400" /> #{tag}
                </span>
              ))}
            </div>

            {/* Post Footer Actions */}
            <div className="flex items-center gap-6 pt-3 border-t border-slate-800/80 text-xs">
              <button 
                onClick={() => handleLike(post.id)}
                className="flex items-center gap-1.5 text-slate-400 hover:text-emerald-400 transition-colors"
              >
                <ThumbsUp className="w-4 h-4" />
                <span>{post.likes} Helpful</span>
              </button>

              <button className="flex items-center gap-1.5 text-slate-400 hover:text-aqua-400 transition-colors">
                <MessageSquare className="w-4 h-4" />
                <span>{post.repliesCount} Replies</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* CREATE POST MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4">
          <div className="glass-panel w-full max-w-lg p-6 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-white">Post to Farmer Community</h3>
            <form onSubmit={handleCreatePost} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Recommended moisture levels for wheat in sandy soil"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-agri-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Content & Advice</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Share your experience with Smart Water Guardian..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-agri-500"
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="agri-button-primary px-5 py-2 text-xs flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Publish Post</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
