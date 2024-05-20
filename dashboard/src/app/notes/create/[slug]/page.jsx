'use client';

import axios from 'axios';
import { useRef, useState } from 'react';
import { ArrowCircleLeft } from '@phosphor-icons/react';
import { Editor } from '@tinymce/tinymce-react';
import { useRouter } from 'next/navigation';
const Create = ({ params: { slug } }) => {
  const router = useRouter();
  const editorRef = useRef(null);
  const [notes, setNotes] = useState({
    title: '',
    description: '',
  });
  const handleDescription = (content) => {
    setNotes({ ...notes, description: content });
  };
  const handleTitle = (e) => {
    setNotes({ ...notes, title: e.target.value });
  };
  const createData = async (e) => {
    const cleanDescription = notes.description.replace(/(<([^>]+)>)/gi, '');
    e.preventDefault();
    const payload = {
      title: notes.title,
      description: cleanDescription,
    };
    await axios
      .post(`https://flowbeat.web.id/api/notes/${slug}`, payload)
      .then((response) => {
        if (response.data.success === true) {
          alert('Notes Created');
          router.push(`/notes/${slug}`);
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="px-20 py-12">
      <div className="flex items-center gap-5">
        <button onClick={() => router.push(`/notes/${slug}`)}>
          <ArrowCircleLeft size={40} />
        </button>
        <h1 className="text-3xl text-[#5d87ff] font-bold">Create Notes</h1>
      </div>
      <div className="mt-10 flex flex-col gap-3">
        <div>
          <label htmlFor="title" className="text-lg  block mb-2 font-medium text-gray-900">
            Title Notes
          </label>
          <input type="text" name="title" id="title" onChange={handleTitle} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg h-10 px-5 w-[50vw]" placeholder="Promo Name" required />
        </div>
        <div className="my-5">
          <label htmlFor="description" className="text-lg block mb-2 font-medium text-gray-900">
            Description Notes
          </label>
          {/* <textarea name="description" onChange={handleNotes} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-3  w-[50vw]" id="exampleFormControlTextarea1" rows="4" placeholder="Notes Description" /> */}
          <Editor
            apiKey="29beonzzetb88fq33tyhw6q6tghwk5qu44899is5yqtkp0gv"
            onInit={(evt, editor) => (editorRef.current = editor)}
            onEditorChange={handleDescription}
            textareaName="description"
            placeholder="Deskripsi Note."
            init={{
              height: 300,
              width: 700,
              menubar: true,
              plugins: ['advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview', 'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen', 'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'],
              toolbar: 'undo redo | blocks | ' + 'bold italic forecolor | alignleft aligncenter ' + 'alignright alignjustify | bullist numlist outdent indent | ' + 'removeformat | help',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
            }}
          />
        </div>

        <button onClick={createData} type="submit" className="w-32 mt-10 text-white bg-sky-700 rounded-lg text-sm p-3 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
          Create Notes
        </button>
      </div>
    </div>
  );
};
export default Create;
