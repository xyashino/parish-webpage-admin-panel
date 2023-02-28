import {SyntheticEvent, useState} from "react";

export const useModal = ()=>{
    const [showModal, setShowModal] = useState(false);
    const displayModal = (e:SyntheticEvent | undefined) => {
        e?.preventDefault();
        setShowModal(true);
    }
    const hideModal = (e:SyntheticEvent | undefined) => {
        e?.preventDefault();
        setShowModal(false);
    }

    return {showModal, displayModal ,hideModal}
}