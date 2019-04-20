import {  
    combineReducers,
    createStore,
} from 'redux'



// actions.js
export const deleteTodo = () => ({  
    type: 'DELETE_TODO',
    name: ''
})

export const setTodo = name => ({  
    type: 'ADD_TODO',
    name: name,
})

INITIAL_STATE = {
    name: 'Todo 1'
}


// reducers.js
const reducer = (state = INITIAL_STATE, action) => {  
  switch (action.type) {
    case 'ADD_TODO':
      return {...state, name: action.name}
    case 'DELETE_TODO':
      return {...state, name: ''}
    default:
      return state
  }
}

export const reducers = combineReducers({  
  todo: reducer
})


// store.js
export const store = createStore(reducers)


console.log("Hello!")
console.log(store.getState)

console.table(store.getState)

console.log(typeof store.getState)

console.log(store)