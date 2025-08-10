import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useContext } from 'react'
import { ChatContext } from '../context/ChatContext'
import { useOllama } from '../hooks/useOllama'

const schema = yup.object({
  userInput: yup
    .string()
    .min(3, 'El mensaje debe tener al menos 3 caracteres')
    .required('El Mensaje es requerido'),
})
export const ChatBot = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })
  const { state, dispatch } = useContext(ChatContext)
  const { sendMessage } = useOllama()

  const handlePregunta = async (data) => {
    // Dispatch para guardar el mensaje del usuario
    dispatch({
      type: 'ADD_MESSAGE',
      payload: {
        from: 'user',
        text: data.userInput
      }
    })
    dispatch({ type: 'SET_LOADING', payload: true })

    try {
      const res = await sendMessage(data.userInput)
      dispatch({
        type: 'ADD_MESSAGE',
        payload: {
          from: 'llama2',
          text: res.data.response
        }
      })
    } catch (error) {
      console.error('error: ', error)
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
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
        {state.loading && <p>Generando respuesta...</p>}
      </div>
    </>
  )
}
