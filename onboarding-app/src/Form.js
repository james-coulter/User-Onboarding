import React, {useState, useEffect} from 'react'
import * as yup from 'yup'
import axios from 'axios'
import './App.css'


const formSchema = yup.object().shape({
    name: yup
    .string()
    .min(0, "This is awkward... Your name must be more than one character long.")
    .required("This is awkward... Your name is required."),
    email: yup
      .string()
      .email("Must be a valid email address")
      .required("Must include email address"),
    password: yup
    .string()
    .required("Password input is required")
    .min(4, "Password requres at least 4 characters"),
    terms: yup
    .boolean()
    .oneOf([true], "You must agree to Terms and Conditions")
})



const Form = (props) => {
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        password: "",
        terms:"",
        // position: ""
    });

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        terms:"",
        // position: ""
    });

    const [user, setUser] = useState([]);

    const [buttonDisabled, setButtonDisabled] = useState(true);


    useEffect(() => {
        formSchema.isValid(formState)
        .then(valid => {
            setButtonDisabled(!valid);
        })
    },[formState])




    const handleSubmit = event => {
        event.preventDefault();
        axios
            .post("https://reqres.in/api/users", formState)
            .then(res => {
                setUser([...user, res.data]);
                console.log("success", user)

            setFormState({
                name:"", 
                email: "",
                password:"",
                terms:"",
                // position: ""
            });
        })
        .catch(err => console.log(err.response))
    }

    const validateChange = event => {
        yup
            .reach(formSchema, event.target.name)
            .validate(event.target.value)
            .then(valid =>{
                setErrors({
                    ...errors,
                    [event.target.name]: ""
                });
            })
            .catch(err => {
                setErrors({
                    ...errors,
                    [event.target.name]: err.errors[0]
                });
            });
    };
    const onInputChange = event => {
        event.persist();
        const newFormData= {
            ...formState,
            [event.target.name]:
                event.target.type === "checkbox" ? event.target.checked
                    : event.target.value
        }
        validateChange(event);
        setFormState(newFormData)

      };
      console.log(errors)

      const char = '@'

    return (
        <div className='whole-container'>
        <form className='team-form' onSubmit={handleSubmit}>
            <div className="inputs-container">
            <h2>Create an Account</h2>
            <h3>Unleash your inner coder!</h3>
            <label>Name:&nbsp;
            <input type="text" value={formState.name} onChange={onInputChange} name='name'/>
            </label>
            <label>Email:&nbsp;
            <input type="text" value={formState.email} onChange={onInputChange} name='email'/>
            {/* {errors.email.includes(char) ? (
                <p className="error-set">{errors.email}</p>) : null } */}
            </label>
            <label>Password:&nbsp;
            <input type="password" value={formState.password} onChange={onInputChange} name='password'/></label>
            <label>Terms of Service:&nbsp;
            <input type="checkbox" value={formState.terms} onChange={onInputChange} name='terms'/></label>
            <button className='submit' disabled={buttonDisabled}>SUBMIT</button>
            </div>
            <div className='errors'>
                {errors.name}
                {errors.email}
                {errors.password}
            </div>
        </form>
         <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
    )
}

export default Form