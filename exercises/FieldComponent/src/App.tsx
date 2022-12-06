import { observer } from "mobx-react-lite";
import UserDetailForm from "./Forms/UserDetailForm";
import UserLoginForm from "./Forms/UserLoginForm";

function App() {
  return (
    <div className="container p-3">
      <UserDetailForm />
      <UserLoginForm />
    </div>
  )
}

export default observer(App)
