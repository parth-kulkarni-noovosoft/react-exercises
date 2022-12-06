import React from "react";
import FormStore from "../stores/FormStore";

// explicit any
const FormStoreContext = React.createContext(new FormStore<any>({}));

export default FormStoreContext;