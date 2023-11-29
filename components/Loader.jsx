import Logo from '@/components/Logo'

export default function Loader({ className }) {
  return (
    <div className={`grid place-items-center h-12 aspect-square animate-spinner-ease-spin  ${className}`}>
      <Logo className='aspect-square h-full' />
    </div>
  )
}
