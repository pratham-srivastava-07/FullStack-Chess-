// import { useNavigate } from "react-router-dom"

export const Button = ({onClick, children} : {onClick: ()=> void, children: React.ReactNode}) => {
    // const navigate = useNavigate();
    return <button
    onClick={onClick}
    className=" text-2xl rounded bg-blue-500 hover:bg-blue-700 text-white font-bold">
       {children}
    </button>
}