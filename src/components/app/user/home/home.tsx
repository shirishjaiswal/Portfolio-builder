"use client";

import FileUpload from "./pdfUploader";

const Home = () => {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='w-96'>
        <FileUpload />
      </div>
    </main>
   
  )
}

export default Home;