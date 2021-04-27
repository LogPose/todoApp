import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import AppHeader from './components/app-header/app-header';
import SearchPanel from './components/search-panel/search-panel';
import TodoList from './components/todo-list/todo-list';
import ItemStatusFilter from './components/item-status-filter/item-status-filter';

import './index.css';
import AddItem from './components/add-item';

export default class App extends Component {

  maxId = 100;

  state = { 
    todoData: [
      this.createTodoItem('Drink Cofee'),
      this.createTodoItem('Make Awesome App'),
      this.createTodoItem('Have a lunch'),
    ],
    term: '',
    filter: 'all' // active, all, done
  }

  createTodoItem(label) {
    return {
        label,
        done: false,
        important: false, 
        id: this.maxId++
      
    }
  }

  deleteItem = (id) => {
    this.setState(({todoData}) => {
      const idx = todoData.findIndex((el) => el.id === id)
      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)]
      return {
        todoData: newArray
      }
    })
  }

  addItem = (text) => {
    const newItem = this.createTodoItem(text)
    this.setState(({todoData}) => {
      const newArray = todoData
      newArray.push(newItem)
      return {
        todoData: newArray
      }
    })
  }

  onToggleDone = (id) => {
    this.setState(({todoData}) => {
      return {
      todoData: this.toggleProperty(todoData, id, 'done')
    }
    })
    console.log('Toggle done', id)
  }

  onToggleImportant = (id) => {
    console.log('Toggle important', id)
    this.setState(({todoData}) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      }
     })
}

 toggleProperty(arr, id, propName) {
  const idx = arr.findIndex((el) => el.id === id)
      const oldItem = arr[idx]
      const newItem = {...oldItem, [propName]: !oldItem[propName]}
      return [...arr.slice(0, idx),
              newItem,
              ...arr.slice(idx + 1)]
      }

search(items, term) {
  if (term.length === 0) {
    return items
  }
  return items.filter((item) => {
    return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
  })
}

filter(items, filter) {
  switch(filter) {
    case 'all':
      return items;
    case 'active':
      return items.filter((item) => !item.done);
    case 'done':
      return items.filter((item) => item.done);
    default:
      return items;
  }
}

onSearchChange = (term) => {
  this.setState({ term })
}

onFilterChange = (filter) => {
  this.setState({ filter })

}

  render() {
    const { todoData, term, filter } = this.state
    const visibleItems = this.filter(this.search(todoData, term), filter)
    const doneCount = todoData.filter((el) => el.done).length
    const todoCount = todoData.length - doneCount
    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel onSearchChange={this.onSearchChange}/>
          <ItemStatusFilter filter={filter} 
                            onFilterChange={this.onFilterChange}
          />
        </div>
        <TodoList todos={visibleItems}
        onDeleted={this.deleteItem}
        onToggleImportant={this.onToggleImportant}
        onToggleDone={this.onToggleDone} />
        <AddItem createNewTodo={this.addItem} />
      </div>
    );
  }
};

ReactDOM.render(<App />,
  document.getElementById('root'));