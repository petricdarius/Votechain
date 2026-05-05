import { useForm } from "react-hook-form" 

export default function Login() {
    const {register, handleSubmit, onError} = useForm();

    function submit(data){
        console.log(data)
        //bla  bla
    }

  return (
    <form onSubmit={handleSubmit(submit, onError)}>
        <input type="email" id="email" {...register("email", {required: "Required field"})} />
        <input type="password" id="password" {...register("password", {required: "Required field"})} />
        <button>Login</button>
    </form>
  );
}