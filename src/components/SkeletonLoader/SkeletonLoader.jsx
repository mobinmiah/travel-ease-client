import React from 'react';

const SkeletonLoader = ({ type = 'card', count = 1 }) => {
  const renderSkeleton = () => {
    switch (type) {
      case 'card':
        return (
          <div className="animate-pulse">
            <div className="bg-gray-300 h-48 w-full rounded-lg mb-4"></div>
            <div className="space-y-2">
              <div className="bg-gray-300 h-4 w-3/4 rounded"></div>
              <div className="bg-gray-300 h-4 w-1/2 rounded"></div>
              <div className="bg-gray-300 h-4 w-2/3 rounded"></div>
            </div>
          </div>
        );
      
      case 'table':
        return (
          <tr className="animate-pulse">
            <td className="py-3 px-4">
              <div className="bg-gray-300 h-4 w-8 rounded"></div>
            </td>
            <td className="py-3 px-4">
              <div className="flex items-center gap-3">
                <div className="bg-gray-300 h-12 w-12 rounded"></div>
                <div className="space-y-2">
                  <div className="bg-gray-300 h-4 w-24 rounded"></div>
                  <div className="bg-gray-300 h-3 w-16 rounded"></div>
                </div>
              </div>
            </td>
            <td className="py-3 px-4">
              <div className="space-y-2">
                <div className="bg-gray-300 h-4 w-20 rounded"></div>
                <div className="bg-gray-300 h-3 w-32 rounded"></div>
              </div>
            </td>
            <td className="py-3 px-4">
              <div className="bg-gray-300 h-4 w-16 rounded"></div>
            </td>
            <td className="py-3 px-4">
              <div className="bg-gray-300 h-4 w-20 rounded"></div>
            </td>
            <td className="py-3 px-4">
              <div className="bg-gray-300 h-8 w-16 rounded-full"></div>
            </td>
          </tr>
        );
      
      case 'text':
        return (
          <div className="animate-pulse space-y-2">
            <div className="bg-gray-300 h-4 w-full rounded"></div>
            <div className="bg-gray-300 h-4 w-5/6 rounded"></div>
            <div className="bg-gray-300 h-4 w-4/6 rounded"></div>
          </div>
        );
      
      default:
        return (
          <div className="animate-pulse">
            <div className="bg-gray-300 h-20 w-full rounded"></div>
          </div>
        );
    }
  };

  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="mb-4">
          {renderSkeleton()}
        </div>
      ))}
    </>
  );
};

export default SkeletonLoader;