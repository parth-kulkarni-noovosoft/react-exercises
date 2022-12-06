import { observer } from "mobx-react-lite";
import RandomForm from "./forms/RandomForm";

function App() {
  return (
    <div className="container p-3">
      <RandomForm />
    </div>
  )
}

export default observer(App)
