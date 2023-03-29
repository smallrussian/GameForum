// components/Response.tsx
import React from 'react';

type ResponseProps = {
  content: string;
};

export const Response = ({ content }:ResponseProps) => {
  return (
    <div className="p-2 mb-2 bg-gray-100 rounded">
      <p>{content}</p>
    </div>
  );
};