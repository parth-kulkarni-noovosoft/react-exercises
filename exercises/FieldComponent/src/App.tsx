import { observer } from "mobx-react-lite";
import MultiInputForm from "./forms/MultiInputForm";
import RandomForm from "./forms/RandomForm";

function App() {
  return (
    <div className="container p-3">
      <MultiInputForm />
      {/* <RandomForm /> */}
    </div>
  )
}

export default observer(App)
