'use client';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { ArrowCircleLeft } from '@phosphor-icons/react';
import { Editor } from '@tinymce/tinymce-react';
import { useRouter } from 'next/navigation';

const Update = ({ params }) => {
  const { id } = params;
  const { slug } = params;
  useEffect(() => {
    axios.get(`https://flowbeat.web.id/api/notes/${slug}`).then((response) => {
      console.log(response.data);
    });
  });
  return (
    <div>
      <h1>notes</h1>
    </div>
  );
};
export default Update;
