import {useState, useEffect} from "react";
import {dbService} from "../fbase";

const Ranking = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        dbService.collection("users")
            .orderBy("point", "desc").onSnapshot(snapshot => {
            setUsers(snapshot.docs.map(doc => ({
                id: doc.id, ...doc.data()
            })));
        })
    },[])

    return <div>

        {
            users.map((user, index) => (
                    <div key={index}>
                        [nickName] {user.nickName} / [user id]{user.id} / [point] {user.point}
                    </div>
                )
            )
        }
    </div>
}

export default Ranking;