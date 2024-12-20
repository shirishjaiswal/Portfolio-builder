'use client';
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import userDetailsFieldInputType from '@/utils/api-connections/admin/user-details-field-input-type';
import getUserInfoGroup from '@/utils/api-connections/admin/get-user-info-group';

export default function FileUpload() {
  const c = async () => {
    const response = await getUserInfoGroup();
    console.log(response);
  }

  const handleCLick = () => {
    c();
  }
  return (
    <>
    <FilePond
      server={{
        process: '/api/eden-ai',
        fetch: null,
        revert: null,
      }}
    />
    <button onClick={handleCLick}>Click</button>
    </>
  );
}