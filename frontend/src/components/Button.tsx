// import { useNavigate } from "react-router-dom"

export const Button = ({onClick, children} : {onClick: ()=> void, children: React.ReactNode}) => {
    // const navigate = useNavigate();
    return <div className="flex items-center">
        <button
    onClick={onClick}
    className=" text-2xl rounded-md bg-blue-500 px-8 py-4 border hover:bg-blue-700 text-white font-bold">
       {children}
    </button>
    </div>
}