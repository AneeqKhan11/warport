import axios from 'axios';
import React, {useEffect,useState} from 'react';
import { err } from 'react-native-svg/lib/typescript/xml';

function FetchPO(props) {
    const [Po, setPo] = useState([])

    useEffect (()=> {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    })

    return (
        <div>
            
        </div>
    );
}

export default FetchPO;