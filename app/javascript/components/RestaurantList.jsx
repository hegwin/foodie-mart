import React, { Component } from 'react'

const url = '/api/v1/restaurants'

class RestaurantList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: []
    }
  }

  componentDidMount() {
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Request failed.')
      })
      .then(response => this.setState({ items: response }))
    //.catch(() => this.props.history.push("/"));
  }

  render () {
    const { items } = this.state
    return (
      <div>
        <ul>
          {
            items.map((item, _) => {
              return <li key={item.id}>{item.name} | {item.description}</li>
            })
          }
        </ul>
      </div>
    )
  }
}

export default RestaurantList;
