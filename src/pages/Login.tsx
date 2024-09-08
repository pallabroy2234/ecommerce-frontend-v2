import React, {useState} from "react";
import {FcGoogle} from "react-icons/fc";
import toast from "react-hot-toast";
import {GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {auth} from "../firebase.ts";
import {useLoginMutation} from "../redux/api/userAPI.ts";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {MessageResponse} from "../types/api-types.ts";
import {useNavigate} from "react-router-dom";

const Login = () => {
	const navigate = useNavigate();
	const [gender, setGender] = useState<string>("");
	const [date, setDate] = useState<string>("");

	// * login handler

	const [login] = useLoginMutation();

	const handleLogin = async () => {
		try {
			const provider = new GoogleAuthProvider();
			const {user} = await signInWithPopup(auth, provider);

			const res = await login({
				_id: user.uid,
				name: user.displayName!,
				email: user.email!,
				image: user.photoURL!,
				gender,
				dob: date,
			});
			if (res.data) {
				toast.success(res.data.message);
				navigate("/");
			} else {
				const error = res.error as FetchBaseQueryError;
				const message = (error.data as MessageResponse).message;
				toast.error(message);
			}
		} catch (error) {
			toast.error("Failed to login");
		}
	};

	return (
		<div className='login'>
			<main>
				<h1 className='heading'>Login</h1>
				<div>
					<label htmlFor='gender'>Gender</label>
					<select
						onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
							setGender(e.target.value)
						}
						value={gender}
						name=''
						id=''>
						<option value=''>Select Gender</option>
						<option value='male'>Male</option>
						<option value='female'>Female</option>
					</select>
				</div>

				<div>
					<label htmlFor='gender'>Date of Birth</label>
					<input
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setDate(e.target.value)
						}
						type='date'
						value={date}
					/>
				</div>
				<div>
					<p>Already Signed In Once</p>
					<button onClick={handleLogin} type='button'>
						<FcGoogle />
						<span>Sign in with Google</span>
					</button>
				</div>
			</main>
		</div>
	);
};
export default Login;
