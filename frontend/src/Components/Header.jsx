
import { FaHome } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


export default function Header() {
    const currentUser = useSelector((state) => state.user && state.user.user.currentUser)
  
    return (
    <div className="py-5">
        <div className="mx-auto max-w-6xl flex justify-between items-center w-full flex-wrap">
             
             <div className="text-xl">
                <FaHome />
             </div>

             <div className="">
                {currentUser ? (
                   <div className="flex justify-center items-center gap-4">
                    <div className="text-lg underline">{currentUser.user.email}</div>
                    <Link to="/dashboard" className="cursor-pointer ">
                      <div className="text-white bg-green-800 p-2 flex justify-center rounded-[20px] w-[150px] hover:bg-orange-800 duration-1000">Admin page</div>
                    </Link>
                   </div>
                ) : (
                    <div className="text-lg">Welcome, Guest</div>
                )}
             </div>

        </div>
    </div>
  )
  
}
