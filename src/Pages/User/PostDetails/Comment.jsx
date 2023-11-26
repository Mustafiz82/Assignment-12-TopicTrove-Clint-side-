import React from 'react';

const Comment = ({item}) => {
    return (
        <div>
            <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src={item.imageUrl} alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div className='space-y-2 mb-5'>
              <div className="font-bold">{item.name}</div>
              <div className="text-sm ">{item?.postInfo.comment}</div>
            </div>
          </div>
        </div>
    );
};

export default Comment;