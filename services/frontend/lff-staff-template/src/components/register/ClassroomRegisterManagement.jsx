import { useState } from "react";
import { useParams } from "react-router-dom"
import CreateRegister from "./CreateRegister";
import ListRegisteredStudent from "./ListRegisteredStudent";

export default function ClassroomRegisterManagement() {
    const params = useParams();
    const [tick, setTick] = useState(false);

    function changeTick() {
        setTick(!tick);
    }

    console.log(params);
    return (
        <>
            <CreateRegister onClose={changeTick}/>
            <ListRegisteredStudent needReload={tick}/>
        </>
    )
}
