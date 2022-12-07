import { observer } from "mobx-react-lite";
import MultiInputForm from "./forms/MultiInputForm";

function App() {
  return (
    <div className="container p-3">
      <MultiInputForm />
    </div>
  )
}

export default observer(App)
