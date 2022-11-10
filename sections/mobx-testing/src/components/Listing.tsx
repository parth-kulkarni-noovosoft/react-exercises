import React from "react";
import {observer} from "mobx-react-lite";
import PetStore from "../stores/PetStore";
import {useRouterStore} from "mobx-state-router";
import OwnerStore from "../stores/OwnerStore";

const PetTable: React.FC<{ store: PetStore }> = observer(({ store }) => {
    if (store.count === 0) {
        return <div>
            <h1>Pet Table</h1>
            Nothing to show.
        </div>
    }

    return (<div>
            <h1>Pet Table</h1>
            <table>
                <tbody>
                <tr>
                    <td>ID</td>
                    <td>Name</td>
                    <td>Owner</td>
                </tr>
                {store.pets.map((pet) => {
                    return <tr key={pet.id}>
                        <td>{pet.id}</td>
                        <td>{pet.name}</td>
                        <td>{pet.owner?.name ?? '---'}</td>
                        <td>
                            <button
                                onClick={() => {
                                    store.deletePet(pet.id)
                                }}
                            >Delete
                            </button>
                        </td>
                    </tr>
                })}
                </tbody>
            </table>
        </div>)
})

const OwnerTable: React.FC<{ store: OwnerStore }> = observer(({store}) => {
    if (store.count === 0) {
        return <div>
            <h1>Owner Table</h1>
            Nothing to show.
        </div>
    }

    return (<div>
        <h1>Owner Table</h1>
        <table>
            <tbody>
            <tr>
                <td>ID</td>
                <td>Name</td>
            </tr>
            {store.owners.map((owner) => {
                return <tr key={owner.id}>
                    <td>{owner.id}</td>
                    <td>{owner.name}</td>
                    <td>
                        <button
                            onClick={() => {
                                store.deleteOwner(owner.id)
                            }}
                        >Delete
                        </button>
                    </td>
                </tr>
            })}
            </tbody>
        </table>
    </div>);
})

interface IListingProps {
    getStore: () => PetStore | OwnerStore
}

const Listing: React.FC<IListingProps> = observer(({ getStore })=> {
    const routerStore = useRouterStore();

    const store = getStore();

    const table = store instanceof PetStore
        ? <PetTable store={store} />
        : <OwnerTable store={store} />

    return <div>
        {table}
        <button
            onClick={() => routerStore.goTo(store instanceof PetStore ? 'createPet' : 'createOwner')}
        >Add</button>
    </div>
});

export default Listing;