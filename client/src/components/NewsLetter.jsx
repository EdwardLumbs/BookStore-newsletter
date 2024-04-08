import { useState } from "react";
import axios from 'axios';
import { useSnackbar} from 'notistack'

export default function NewsLetter({loading, setLoading}) {
    const [email, setEmail] = useState('')
    console.log(email)

    const { enqueueSnackbar } = useSnackbar()

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('clicked')
        setLoading(true)
        console.log(email)
        axios
            .post('http://localhost:3000/email/addEmail', {email})
            .then(() => {
                console.log('clicked')
                setLoading(false)
                enqueueSnackbar("Emailed Registered Successfully", { variant: 'success' })
            })
            .catch((error) => {
                setLoading(false)
                enqueueSnackbar("Error", {variant: 'error'})
                console.log(error)
            })
    }

    const handleChange = (e) => {
        setEmail(e.target.value)
    }

    return (
        <form 
            onSubmit={handleSubmit}
            className='flex flex-col justify-center items-center gap-4 border border-green-300 py-4 rounded-lg'
        >
            <div
                className='text-center'
            >
                <h1 className="font-bold text-xl">
                    Join our Weekly Newsletter
                </h1>
                <p>
                    Get weekly book recommendations and more!
                </p>
            </div>
            <input 
                className='border rounded-md border-green-300 px-2 py-1'
                type="email" 
                value={email}
                required
                disabled={loading}
                onChange={handleChange}
                placeholder="Type your email here"
            />
            <button className='bg-green-300 border border-green-300 py-2 px-5 rounded-md text-white hover:bg-white hover:text-green-300 duration-200'>
                Register
            </button>
        </form>
    )
}
