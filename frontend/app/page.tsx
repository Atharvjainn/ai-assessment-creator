import EmptyAssignment from '@/components/EmptyAssignment'
import Sidebar from '@/components/SideBar'
import TopNavbar from '@/components/TopNavbar'
import React from 'react'
import { useRouter } from 'next/navigation'

const page = () => {
  const router = useRouter()
  router.push('/dashboard')
  return (
    <>
     <div>Hi</div>

    </>
  )
}

export default page