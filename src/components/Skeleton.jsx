import React from 'react';

/**
 * Skeleton loader components for better UX while content is loading
 */

// Base skeleton component with shimmer animation
const Skeleton = ({ className = '', width, height, circle = false }) => {
  const baseClasses = "animate-pulse bg-gray-700/50 rounded";
  const shapeClass = circle ? "rounded-full" : "rounded";
  
  const style = {
    width: width || '100%',
    height: height || '1rem',
  };

  return (
    <div 
      className={`${baseClasses} ${shapeClass} ${className}`}
      style={style}
      aria-label="Loading..."
    />
  );
};

// Card skeleton for events, projects, etc.
export const CardSkeleton = () => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-6 shadow-xl">
      {/* Image placeholder */}
      <Skeleton height="12rem" className="mb-4" />
      
      {/* Title */}
      <Skeleton width="70%" height="1.5rem" className="mb-3" />
      
      {/* Description lines */}
      <Skeleton width="100%" height="1rem" className="mb-2" />
      <Skeleton width="90%" height="1rem" className="mb-2" />
      <Skeleton width="80%" height="1rem" className="mb-4" />
      
      {/* Tags */}
      <div className="flex gap-2 mb-4">
        <Skeleton width="4rem" height="1.5rem" />
        <Skeleton width="5rem" height="1.5rem" />
        <Skeleton width="4.5rem" height="1.5rem" />
      </div>
      
      {/* Button */}
      <Skeleton width="8rem" height="2.5rem" />
    </div>
  );
};

// Member card skeleton
export const MemberCardSkeleton = () => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-6 shadow-xl">
      {/* Avatar */}
      <div className="flex justify-center mb-4">
        <Skeleton circle width="6rem" height="6rem" />
      </div>
      
      {/* Name */}
      <Skeleton width="70%" height="1.25rem" className="mb-2 mx-auto" />
      
      {/* Role */}
      <Skeleton width="50%" height="1rem" className="mb-4 mx-auto" />
      
      {/* Bio */}
      <Skeleton width="100%" height="0.875rem" className="mb-2" />
      <Skeleton width="95%" height="0.875rem" className="mb-2" />
      <Skeleton width="85%" height="0.875rem" className="mb-4" />
      
      {/* Social icons */}
      <div className="flex justify-center gap-3">
        <Skeleton circle width="2rem" height="2rem" />
        <Skeleton circle width="2rem" height="2rem" />
        <Skeleton circle width="2rem" height="2rem" />
      </div>
    </div>
  );
};

// List item skeleton for simple lists
export const ListItemSkeleton = () => {
  return (
    <div className="flex items-center gap-4 p-4 bg-gray-800/30 rounded-lg mb-2">
      <Skeleton circle width="3rem" height="3rem" />
      <div className="flex-1">
        <Skeleton width="60%" height="1.25rem" className="mb-2" />
        <Skeleton width="40%" height="0.875rem" />
      </div>
    </div>
  );
};

// News article skeleton
export const NewsArticleSkeleton = () => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-purple-500/30 rounded-2xl overflow-hidden shadow-xl">
      {/* Image */}
      <Skeleton height="14rem" className="rounded-none" />
      
      <div className="p-6">
        {/* Category and date */}
        <div className="flex justify-between items-center mb-3">
          <Skeleton width="5rem" height="1.25rem" />
          <Skeleton width="6rem" height="1rem" />
        </div>
        
        {/* Title */}
        <Skeleton width="90%" height="1.5rem" className="mb-3" />
        <Skeleton width="70%" height="1.5rem" className="mb-4" />
        
        {/* Description */}
        <Skeleton width="100%" height="1rem" className="mb-2" />
        <Skeleton width="100%" height="1rem" className="mb-2" />
        <Skeleton width="85%" height="1rem" className="mb-4" />
        
        {/* Read more button */}
        <Skeleton width="7rem" height="2.25rem" />
      </div>
    </div>
  );
};

// Table row skeleton
export const TableRowSkeleton = ({ columns = 4 }) => {
  return (
    <tr className="border-b border-gray-700/50">
      {Array.from({ length: columns }).map((_, index) => (
        <td key={index} className="p-4">
          <Skeleton height="1.25rem" />
        </td>
      ))}
    </tr>
  );
};

// Grid of card skeletons
export const SkeletonGrid = ({ count = 6, type = 'card' }) => {
  const SkeletonComponent = {
    card: CardSkeleton,
    member: MemberCardSkeleton,
    news: NewsArticleSkeleton,
    list: ListItemSkeleton,
  }[type] || CardSkeleton;

  return (
    <div className={`grid gap-6 ${
      type === 'list' ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
    }`}>
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonComponent key={index} />
      ))}
    </div>
  );
};

export default Skeleton;
