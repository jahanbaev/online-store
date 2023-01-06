import { Link } from "react-router-dom"

const NotFound = () =>{
    return (
        <div className="flex flex-col items-center justify-center h-[70vh]">
            <h1 className="text-9xl cursor-pointer opacity-50 font-bold">404</h1>
            <Link className="mt-5" to="/">back to home page</Link>
        </div>
    )
}

export default NotFound