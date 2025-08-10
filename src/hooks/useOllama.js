import axios from 'axios'
import { useReducer } from 'react'

const initialState = {
  messages: []
}

const chatReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload]
      }
    case 'reset':
      return initialState
    default:
      return state
  }
}
export const useOllama = () => {
  const [dispatch] = useReducer(chatReducer, initialState)
  const sendMessage = async (userPrompt) => {
    try {
      const res = await axios.post('http://localhost:11434/api/generate', {
        model: 'llama2',
        prompt: userPrompt,
        stream: false
      })
      // Dispatch para guardar el mensaje del usuario
      dispatch({
        type: 'ADD_MESSAGE',
        payload: {
          from: 'user',
          text: userPrompt
        }
      })
      // Dispatch para guardar la respuesta de llama2
      dispatch({
        type: 'ADD_MESSAGE',
        payload: {
          from: 'llama2',
          text: res.data.response
        }
      })
    } catch (error) {
      console.error('error: ', error)
    }
  }

  return { sendMessage }
}
