import React from 'react'
import Form from './HomeForm'
import Action from './HomeAction'
import Display from './HomeDisplay'

const Home = (props) => {
    
    return (
        <div>
            <Form />
            <Action action={props.localState.action} />
            <Display groceries={props.localState.groceries} />
        </div>
    )
}

export default Home