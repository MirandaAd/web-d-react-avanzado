import { useReducer } from 'react'

// 1. Crear el contexto global
export const ChatContext = createContext()

const initialState = {
  messages: []
}

const chatReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      console.log('agregando mensaje...')
      console.log(state)
      return { ...state, messages: [...state.messages, action.payload] }
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    default:
      return state
  }
}
/*
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
*/

// 2. Crear el provider
export const ChatProvider = ({ children }) => {
  const [state, dispatch] = useReducer(chatReducer, initialState)
  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatContext.Provider>
  )
}
