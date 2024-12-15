import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Lock, MailCheck, UserRoundCheck } from 'lucide-react'
import React, { useState } from 'react'
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
const Login = () => {
  const [state, setState] = useState('Login');
  const [error,setError] = useState('');
  return (
    <div className='w-screen h-screen bg-slate-200'>
      <div className="flex w-full h-full items-center justify-center">
        <div className="w-[50%] h-3/4 bg-white flex gap-0 rounded-lg shadow-lg">
          <div className="flex-1">
            <img className='object-cover w-full h-full' src="https://images.pexels.com/photos/7307532/pexels-photo-7307532.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
          </div>
          <div className="flex-1">
            <div className="w-full h-full flex flex-col items-center justify-center">
              <h1 className='text-2xl font-bold text-center text-slate-800 mb-5'>{state === 'Login' ? 'Login' : 'Register'}</h1>
              <form className='flex flex-col gap-3 w-[70%]'>
                <div className="flex flex-col gap-2">
                  <Label className='text-sm text-slate-700'>Email</Label>
                  <div className="relative">
                    <MailCheck className='absolute size-4 text-green-600 top-2.5 left-3'/>
                    <Input className='px-10' type='email' placeholder='Enter your email' />
                  </div>
                </div>
                {
                  state ==='Register' && <div className="flex flex-col gap-2">
                  <Label className='text-sm text-slate-700'>Username</Label>
                  <div className="relative">
                    <UserRoundCheck className='absolute size-4 text-green-600 top-2.5 left-3' />
                    <Input className='px-10' type='text' placeholder='Enter your username' />
                  </div>
                </div>
                }
                <div className="flex flex-col gap-2">
                  <Label className='text-sm text-slate-700'>Password</Label>
                  <div className="relative">
                    <Lock className='absolute size-4 text-green-600 top-2.5 left-3 '/>
                    <Input className='px-10' type='password' placeholder='Enter password' />
                  </div>
                </div>
                <Button className='w-full mt-5'>{state === 'Login' ? 'Login' : 'Register'}</Button>
                {state === 'Login' ? <p onClick={() => setState('Register')} className='text-gray-500 text-xs'>Dont have an account? <span className='text-blue-600 hover:text-blue-800 cursor-pointer'>Register</span></p> 
                : <p onClick={() => setState('Login')} className='text-gray-500 text-xs'>Already have an account? <span className='text-blue-600 hover:text-blue-800 cursor-pointer'>Login</span></p>  
              }
              {error && <p className='text-red-500 text-sm'>{error}</p>}
              </form>
              <div className="flex gap-2 w-[70%] items-center justify-center my-3">
                <div className="bg-gray-300 flex-1 h-[1px]"/>
                <p className='text-xs text-gray-500'>or</p>
                <div  className="bg-gray-300 flex-1 h-[1px]"/>
              </div>
              
              <div className="flex gap-3">
                <Button  className='rounded-full p-2 hover:bg-slate-300 hover:scale-110' variant='outline'><FaGithub />
                </Button>
                <Button className='rounded-full p-2 hover:bg-slate-300 hover:scale-110' variant='outline'><FaGoogle/></Button>
              </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login