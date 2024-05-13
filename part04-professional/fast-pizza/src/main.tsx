import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'

import store from './store.ts'
import router from './routes.tsx'
import './index.css'

ReactDOM
  .createRoot(document.getElementById('root')!)
  .render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
)
