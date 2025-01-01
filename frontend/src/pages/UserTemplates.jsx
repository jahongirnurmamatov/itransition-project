import TabelForms from '@/components/allForms/TableForms';
import { useUsersStore } from '@/store/usersStore';
import { useSearchParams } from 'react-router-dom';

const UserTemplates = () => {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get('userId'); 
  const {user}=useUsersStore();
  return (
    <div className='w-full min-h-screen flex items-start justify-center'>
    <div className="mx-auto w-[90%] my-6">
      <h1 className='text-2xl font-bold text-center text-primary mb-10'>Templates of {user?.username}</h1>
      <TabelForms  userId={userId} />
    </div>
  </div>
  )
}

export default UserTemplates