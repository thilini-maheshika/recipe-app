import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';

const Yup = require('yup');

const Register = () => {
  const [formData, setFormData] = useState({
    data: {},
    errors: {}
  });

  const [error, setError] = useState("");

  const navigate = useNavigate();


  const handleChange = (e) => {
    validateField(e.target);
  };

  const handleFormSubmit = async (event) => {
      event.preventDefault();
      const isValid = await validateForm(event.target);

      if (isValid) {
          const { confirm_password, ...formDataWithoutConfirm } = formData.data;
          onSubmit(formDataWithoutConfirm);
      }
  };

    const onSubmit = async (data) => {

        try {
            const response = await axios.post(
                process.env.REACT_APP_API_ENDPOINT + '/user/create',
                data
            );

            if (response.data) {
                // Handle success
                navigate('/login');
            } else {
                setError(response.data.error);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setError(error.response.data.error);
        }
    };

    const validateField = ({ name, value }) => {
      let fieldError = null;

      // Define validation schema based on field name
      let fieldSchema;
      switch (name) {
          case 'email':
              fieldSchema = Yup.string().email('Invalid email address').required('Email field is required');
              break;
          case 'phone':
              fieldSchema = Yup.string().matches(/^(\d{10}|\d{12})$/, {
                  message: 'Invalid mobile number',
                  excludeEmptyString: true,
              }).required('Phone field is required');
              break;
          case 'password':
              fieldSchema = Yup.string()
                  .min(8, 'Password must be at least 8 characters long')
                  .matches(
                      /^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[!@#$%^&*()_+])[a-zA-Z0-9!@#$%^&*()_+]+$/,
                      'Password must include at least one letter, one number, and one symbol'
                  )
                  .required('Password is required');
              break;
          default:
              fieldSchema = Yup.string().required('Field is required');
      }

      try {
          fieldSchema.validateSync(value);
      } catch (error) {
          fieldError = error.message;
      }

      if (name == 'confirm_password'){
          if(formData.data.password != value ){
              fieldError = "Password is not Match";
          }
      }
      const sanitizedValue = DOMPurify.sanitize(value);

      setFormData((prevState) => ({
          data: {
              ...prevState.data,
              [name]: sanitizedValue
          },
          errors: {
              ...prevState.errors,
              [name]: fieldError
          }
      }));
    };

    const validateForm = async (form) => {
      let isValid = true;

      for (let index = 0; index < form.length; index++) {
          const { localName, name, value } = form[index];
          if (localName === 'input' || localName === 'select') {
              validateField({ name, value });
              if (formData.errors[name] !== null) {
                  isValid = false;
              }
          }
      }

      return isValid;
    };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-3xl">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto w-6/12" src="./logo.png" alt="COOK" />
        </div>
        <div className="sm:mx-auto sm:w-full sm:px-10 md:px-0">
          <h1 className="text-left text-2xl font-semibold leading-9 text-gray-900">
            Register
          </h1>
        </div>
        <form className="mt-6 space-y-4" onSubmit={handleFormSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-4 md:gap-16">
            <div className="relative z-0 w-full group">
              <input
                type="text"
                name="first_name"
                id="first_name"
                value={formData.data.first_name || ''}
                onChange={(e) => { handleChange(e) }}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-pink-600 peer"
                placeholder=" "
                required
              />
              {formData.errors['first_name'] && (<p className="mt-2 text-left text-sm text-pink-700"><small>{formData.errors['first_name']}</small></p>)}
              <label
                htmlFor="first_name"
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-pink-600 peer-focus:dark:text-pink-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                First Name
              </label>
            </div>

            <div className="relative z-0 w-full group">
              <input
                type="text"
                name="last_name"
                id="last_name"
                value={formData.data.last_name || ''}
                onChange={(e) => { handleChange(e) }}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-pink-600 peer"
                placeholder=" "
                required
              />
              {formData.errors['last_name'] && (<p className="mt-2 text-left text-sm text-pink-700"><small>{formData.errors['last_name']}</small></p>)}
              <label
                htmlFor="last_name"
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-pink-600 peer-focus:dark:text-pink-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Last Name
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-4 md:gap-16">
            <div className="relative z-0 w-full group">
              <input
                type="email"
                name="email"
                id="email"
                value={formData.data.email || ''}
                onChange={(e) => { handleChange(e) }}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-pink-600 peer"
                placeholder=" "
                required
              />
              {formData.errors['email'] && (<p className="mt-2 text-left text-sm text-pink-700"><small>{formData.errors['email']}</small></p>)}
              <label
                htmlFor="email"
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-pink-600 peer-focus:dark:text-pink-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Email
              </label>
            </div>

            <div className="relative z-0 w-full group">
              <input
                type="text"
                name="phone"
                id="phone"
                value={formData.data.phone || ''}
                onChange={(e) => { handleChange(e) }}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-pink-600 peer"
                placeholder=" "
                required
              />
              {formData.errors['phone'] && (<p className="mt-2 text-left text-sm text-pink-700"><small>{formData.errors['phone']}</small></p>)}
              <label
                htmlFor="phone"
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-pink-600 peer-focus:dark:text-pink-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Phone Number
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-4 md:gap-16">
            <div className="relative z-0 w-full group">
              <input
                type="password"
                name="password"
                id="password"
                value={formData.data.password || ''}
                onChange={(e) => { handleChange(e) }}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-pink-600 peer"
                placeholder=" "
                required
              />
              {formData.errors['password'] && (<p className="mt-2 text-left text-sm text-pink-700"><small>{formData.errors['password']}</small></p>)}
              <label
                htmlFor="password"
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-pink-600 peer-focus:dark:text-pink-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Password
              </label>
            </div>

            <div className="relative z-0 w-full group">
              <input
                type="password"
                name="confirm_password"
                id="confirm_password"
                value={formData.data.confirm_password || ''}
                onChange={(e) => { handleChange(e) }}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-pink-600 peer"
                placeholder=" "
                required
              />
              {formData.errors['confirm_password'] && (<p className="mt-2 text-left text-sm text-pink-700"><small>{formData.errors['confirm_password']}</small></p>)}
              <label
                htmlFor="confirm_password"
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-pink-600 peer-focus:dark:text-pink-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Confirm Password
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="md:w-1/3 sm:w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-500 hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
          >
            Create Account
          </button>
          {error && (<p className="text-left mt-2 text-sm text-pink-700">{error}</p>)}
        </form>

        <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <a href="/login" className="text-pink-500 hover:underline">
                Login
              </a>
            </p>
          </div>
      </div>
    </div>
  );
};

export default Register;
