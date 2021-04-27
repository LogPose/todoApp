import React, { Component } from 'react'
import './add-item.css'

export default class AddItem extends Component {

    state = {
        label: ''
    }

    onLabelChange = (event) => {
        this.setState({
            label: event.target.value
        })
        console.log(event.target.value)
    }

    onSubmit = (event) => {
        event.preventDefault()
        this.props.createNewTodo(this.state.label)
        this.setState({
            label: ''
        })
    }

    render() {
        return (
            <form className="add-item-form d-flex"
            onSubmit={this.onSubmit}>
                <input type="text"
                        className="form-control"
                        onChange={this.onLabelChange}
                        placeholder="What need to be done?"
                        value={this.state.label}></input>
                <button  
                className="btn btn-outline-secondary">
                Добавить событие
                </button>
            </form>
        )
    }
}