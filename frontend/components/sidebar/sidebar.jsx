


import React from 'react';

class Sidebar extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      shelfname: ""
    };

    this.handleAll = this.handleAll.bind(this);
    this.handleShelf = this.handleShelf.bind(this);
    this.handleAddShelf = this.handleAddShelf.bind(this);
  }

  update(property) {
    return e => this.setState({[property]: e.target.value});
  }

  componentDidMount() {
    this.props.requestAllBookshelves();
  }

  handleAll() {
    this.props.requestAllManga("all");
  }

  handleShelf(e) {
    let target = e.currentTarget.value;
    this.props.requestAllManga(target);
  }

  handleAddShelf(e) {
    const shelf = this.state.shelfname;
    console.log(shelf);
    this.props.createBookshelf(shelf);
  }

  render() {


    let bookshelves = [];
    if (this.props.bookshelves ) {
      bookshelves = this.props.bookshelves;
      console.log(bookshelves);
    }

    const {shelfname} = this.state;
    // need an if statment or an for loop to skip the first two elements in the bookshelf

    return (
      <main className="sidebar-container">
        <div className="sidbar-wrapper">
          <ul className="sidebar-shelves-holder">

          <input className="sidebar-all" onClick={this.handleAll}
            type="submit" value="All"/>

          <input className="sidebar-to-read" onClick={this.props.requestAllManga.bind(this, "Want-To-Read")}
            type="submit" value="Want-To-Read"/>

          <input className="sidebar-to-read" onClick={this.props.requestAllManga.bind(this, "Read")}
            type="submit" value="Read"/>

          <input className="sidebar-to-read" onClick={this.props.requestAllManga.bind(this, "Currently-Reading")}
            type="submit" value="Currently-Reading"/>

          {bookshelves.map((shelf, i) => {
            return (<div className="sidebar-generated-buttons">
            <input key={i} className="sidebar-shelves" onClick={this.handleShelf}
              type="submit" value={shelf.title} />

            <span className="sidebar-delete" onClick={this.props.deleteBookshelf.bind(this, shelf.id)}>X</span>
            </div>
          );
          })}

        </ul>
        <input className="sidebar-shelf-name"
               type="text"
               placeholder="Shelfname"
               value={shelfname}
               onChange={this.update("shelfname")}/>
             <br></br>
          <input className="addShelfSubmit"
                 type="submit"
                 placeholder="Add Shelf"
                 onClick={this.handleAddShelf} />
        </div>
      </main>
    );
  }
}


export default Sidebar;
