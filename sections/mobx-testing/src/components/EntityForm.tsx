import React, {useState} from "react";
import {observer} from "mobx-react-lite";
import RootStore from '../stores';
import {useRouterStore} from "mobx-state-router";

const PetForm = (goHome: () => void) => {
    const [name, setName] = useState('');
    const [ownerID, setOwnerID] = useState('');
    const store = RootStore.petStore;

    return <form>
        <div>
            <label>Name</label>
            <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
            />
        </div>
        <div>
            <label>Owner</label>
            <input
                type="number"
                value={ownerID}
                onChange={e => setOwnerID(e.target.value)}
            />
        </div>

        <button
            type="submit"
            onClick={e => {
                store.addPet({
                    name,
                    ownerID: ownerID === '' ? null : +ownerID
                });
                e.preventDefault();
                goHome();
            }}
        >Create Pet</button>
    </form>
}

const OwnerForm = (goHome: () => void) => {
    const [name, setName] = useState('');
    const store = RootStore.ownerStore;

    return <form>
        <div>
            <label>Name</label>
            <input
                value={name}
                onChange={e => setName(e.target.value)}
                type="text"
            />
        </div>

        <button
            type="submit"
            onClick={e => {
                store.addOwner({
                    name
                })
                e.preventDefault();
                goHome();
            }}
        >Create Owner</button>
    </form>
}

const EntityForm: React.FC<{
    type: 'pet' | 'owner'
}> = observer(({ type }) => {
    const routerStore = useRouterStore();
    const goHome = () => routerStore.goTo('home');
    return type === 'pet'
        ? PetForm(goHome)
        : OwnerForm(goHome)
})

export default EntityForm;