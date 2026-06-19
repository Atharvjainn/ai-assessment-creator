
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Page = async() => {
  const user = await currentUser();
  if(!user?.unsafeMetadata.schoolName){
    redirect('/Onboard');
  }
  redirect('/dashboard');
};

export default Page;