import TabelForms from '@/components/allForms/TableForms';
import { useLanguageStore } from '@/store/languageStore';
import { useTemplateStore } from '@/store/templateStore';
import { useUsersStore } from '@/store/usersStore';
import { useSearchParams } from 'react-router-dom';

const UserTemplates = () => {
  const {dictionary:d} = useLanguageStore();
  const [searchParams] = useSearchParams();
  const userId = searchParams.get('userId'); 
  const {user}=useUsersStore();
  const {templates} = useTemplateStore();
  if(templates.length===0){
    return (
      <div className='w-full min-h-screen flex items-start justify-center'>
      <div className="mx-auto w-[90%] my-6">
        <h1 className='text-2xl font-bold text-center text-primary mb-10'>{d.noTemplatesYet}</h1>
      </div>
    </div>
    )
  }
  return (
    <div className='w-full min-h-screen flex items-start justify-center'>
    <div className="mx-auto w-[90%] my-6">
      <h1 className='text-2xl font-bold text-center text-primary mb-10'>{d.templatesOf} {user?.username}</h1>
      <TabelForms  userId={userId} />
    </div>
  </div>
  )
}

export default UserTemplates