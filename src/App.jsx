import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import './index.css'
import * as yup from 'yup'
import axios from 'axios'
import { useReducer, useState } from 'react'

const schema = yup.object({
  userInput: yup
    .string()
    .min(3, 'El mensaje debe tener al menos 3 caracteres')
    .required('El Mensaje es requerido'),
})

export const App = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })
  // Guarda la respuesta de llama2
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  const handlePregunta = async (data) => {
    console.log(data)
    setLoading(true)
  }

  return (
    <>
      <form onSubmit={handleSubmit(handlePregunta)}>
        <input
          type='text'
          {...register('userInput')}
          className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
        {errors.userInput && <p>{errors.userInput.message}</p>}
        <button
          className='className={`w-full px-4 py-2 rounded trasnsition cursor-pointer bg-blue-500 hover:bg-blue-600`}'
        >Preguntar
        </button>
      </form>
      {/* <div>
        <p>{loading ? 'Cargando...' : response}</p>
      </div> */}
      <div>
        {state.messages.map((message, index) => (
          <p key={index}>
            <strong>{message.from === 'user' ? 'Tú: ' : 'Llama2: '}</strong>
            {message.text}
          </p>
        ))}
      </div>
    </>
  )
}
