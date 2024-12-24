import { Button } from '@/components/ui/button'

const NotFound = () => {
  return (
    <div className='w-full bg-white min-h-screen flex items-start justify-center'>
      <div className="mx-auto w-4/5 my-6 flex flex-col items-center justify-center">
        <img className='w-1/2' src="/404.svg" alt="404" />
        <Button onClick={() => window.location.href = '/'}>Back to Home</Button>
      </div>
    </div>
  )
}

export default NotFound