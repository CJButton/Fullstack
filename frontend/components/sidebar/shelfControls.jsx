


import React from 'react';
import {Link} from 'react-router';

import DeleteShelfModal from './deleteModal';

import { Nav,
         Navbar,
         NavItem,
         NavDropdown,
         MenuItem,
         FormGroup,
         FormControl,
         Button,
         Form,
         Grid,
         Row,
         Col } from 'react-bootstrap';

class shelfControls extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      bookshelves: this.props.bookshelves,
      shelfname: "",
      deleteModal: false,
      shelfId: 0,
      dropdown: 'All-Shelves'
    };

    this.handleAddShelf = this.handleAddShelf.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.updateShelf = this.updateShelf.bind(this);
    this.closeDeleteModal = this.closeDeleteModal.bind(this);
    this.deleteShelf = this.deleteShelf.bind(this);
    this.getComicsForShelf = this.getComicsForShelf.bind(this);
  }

  componentWillReceiveProps(nextprops) {
    if (nextprops.bookshelves.length > 0 && this.props.bookshelves.length < 1) {
      nextprops.bookshelves.map((shelf) => {
        this.setState({
          [shelf.title]: "bg"
        });
      });
    }
  }

  updateShelf(e) {
    this.setState({
      shelfname: e.target.value
    });
  }

  handleAddShelf() {
    const shelf = this.state.shelfname;
    this.props.createBookshelf(shelf);
    this.setState({
      shelfname: ''
    });
  }

  getComicsForPersonalShelf(shelfname) {
    this.props.requestAllManga(shelfname);
  }

  deleteModal(shelfId) {
    this.setState({
      deleteModal: true,
      shelfId: shelfId
    });
  }

  deleteShelf() {
    this.props.deleteBookshelf(this.state.shelfId);
    this.closeDeleteModal();
    this.setState({
      dropdown: 'All-Shelves'
    });
    this.getComicsForShelf('all')
  }

  handleSelect(e) {
    this.getComicsForPersonalShelf(e.title);
    this.setState({
      dropdown: e.title
    });
  }

  getComicsForShelf(shelfname) {
    this.props.requestAllManga(shelfname);

    const shelfNames = {
      'all': 'All-Shelves',
      'Read': 'Have-Read',
      'Currently-Reading': 'Currently-Reading',
      'Want-To-Read': 'Want-To-Read'
    }
    console.log(shelfname);
    const updateShelf = shelfNames[shelfname];
    console.log(updateShelf);
    this.setState({
      dropdown: [updateShelf]
    });
    //
    // shelfname === 'all' ? this.setState({
    //   dropdown: 'All-Shelves'
    // }) : this.setState({
    //   dropdown: shelfname
    // });
  }

  handleShelfDelete(shelfId) {
    this.setState({
      deleteModal: true,
      shelfId: shelfId
    });
  }

  closeDeleteModal() {
    this.setState({
      deleteModal: false
    });
  }

  render() {
    const shelfTitle = this.state.dropdown;
    const shelfname = this.state.shelfname;
    const openClose = this.state.deleteModal;
    const changeShelfType = this.props.changeShelfType;

    const handleAddShelf = this.handleAddShelf;
    const closeDeleteModal = this.closeDeleteModal;
    const deleteShelf = this.deleteShelf;
    // let user create shevles on each manga page

    // X hide too long shelf name
    return (
      <div>
        <Navbar collapseOnSelect>
          <div className='shelf-nav-a'>
            <Navbar.Header>
              <Navbar.Brand>
                <a>Manga-Shelves</a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
          </div>
          <div className='shelf-nav-b'>
            <Navbar.Header>
              <Navbar.Brand>
                <a>{shelfTitle}</a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
          </div>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1} onSelect={() => changeShelfType('bars')}>
                <i className='fa fa-bars nav-type' aria-hidden='true' />
              </NavItem>
              <NavItem eventKey={2} onSelect={() => changeShelfType('grid')}>
                <i className='fa fa-th-large nav-type' aria-hidden='true' />
              </NavItem>
              <NavDropdown eventKey={3} title={shelfTitle} id="basic-nav-dropdown">
                <MenuItem
                  eventKey={3.1}
                  onSelect={() => this.getComicsForShelf('all')}
                  >All-Shelves</MenuItem>
                <MenuItem
                  eventKey={3.2}
                  onSelect={() => this.getComicsForShelf('Want-To-Read')}
                  >Want-To-Read</MenuItem>
                <MenuItem
                  eventKey={3.3}
                  onSelect={() => this.getComicsForShelf('Currently-Reading')}
                  >Currently-Reading</MenuItem>
                <MenuItem
                  eventKey={3.4}
                  onSelect={() => this.getComicsForShelf('Read')}
                  >Have-Read</MenuItem>
                <MenuItem divider />
                {this.props.bookshelves.map((shelf, i) => {
                  return(
                      <MenuItem
                        key={i + 4}
                        eventKey={i + 4}
                        onSelect={() => this.handleSelect(shelf)}>
                        <div className='shelf-menu-item'>
                          <div className='shelf-menu-title'>
                            {shelf.title}
                          </div>
                          <button
                            className='shelf-delete-button'
                            onClick={() => this.handleShelfDelete(shelf.id)}>
                            X
                          </button>
                        </div>
                      </MenuItem>
                  )
                })}
              </NavDropdown>
            </Nav>
              <Navbar.Form pullRight>
                <FormGroup>
                  <FormControl
                    type="text"
                    placeholder="Create a Shelf"
                    value={shelfname}
                    onChange={this.updateShelf}/>
                </FormGroup>
                <Button
                  className='shelf-button'
                  type="submit"
                  onClick={() => handleAddShelf()}>Create</Button>
              </Navbar.Form>
          </Navbar.Collapse>
        </Navbar>

        <DeleteShelfModal
          openClose={openClose}
          closeDeleteModal={closeDeleteModal}
          deleteShelf={deleteShelf}/>

        { /*



          <Nav pullRight>
          </Nav>
        <div className="sidbar-wrapper">
          <ul className="sidebar-shelves-holder">

        <div className="sidebar-topper">
            <div className="sidebar-shelves-title">Manga Status</div>
          <input className={`sidebar-all button ` + this.state.all}
            onClick={this.getComicsForShelf.bind(this, "all")}
            type="submit" value="All"/>

          <input className={`sidebar-all button ` + this.state.currently}
            onClick={this.getComicsForShelf.bind(this, "Currently-Reading")}
            type="submit" value="Currently-Reading"/>

          <input className={`sidebar-all button ` + this.state.read}
            onClick={this.getComicsForShelf.bind(this, "Read")}
            type="submit" value="Read"/>

          <input className={`sidebar-all button ` + this.state.want}
            onClick={this.getComicsForShelf.bind(this, "Want-To-Read")}
            type="submit" value="Want-To-Read"/>

          <br className="sidebar-break"></br>
          </div>
          <br></br>


          <div className="userGenShelvesContainer">
            <div className="shelf-title">Bookshelves</div>
            {this.props.bookshelves.map((shelf, i) => {
              return (<div key={i} className="sidebar-generated-buttons">
              <div className={`sidebar-shelves button ` + this.state[shelf.title] }
                   onClick={this.getComicsForPersonalShelf.bind(this, shelf.title)}>
                   {shelf.title}</div>
              <div className="sidebar-delete button"
                   onClick={this.deleteModal.bind(this, shelf.id)}>X</div>
              </div>
            );
            })}
        </div>
        </ul>
          <div className="addShelves-sidebar">
            <p>Add your own Shelf!</p>
            <input className="sidebar-shelf-name"
              type="text"
              placeholder="Shelfname"
              value={this.state.shelfname}
              onChange={this.updateShelf("shelfname")}/>

           <input className="addShelfSubmit button"
               type="submit"
               placeholder="Add Shelf"
               onClick={this.handleAddShelf} />
         </div>
        </div>

        <div className="deleteModalContainer">
          <Modal className="deleteModal"
            isOpen={this.state.deleteModal}
            contentLabel="Modal">
            <div className="deleteShelfText">Sure you want to delete your shelf?</div>
            <div className="deleteEditClose">
              <button className="deleteButton button"
                onClick={this.deleteShelf.bind(this)}>
                Yes, delete it.</button>
              <button className="cancelDelete button"
                onClick={this.closeModal.bind(this)}>No! Leave as is!</button>
            </div>
          </Modal>
        </div>
        */}
      </div>
    );
  }
}

export default shelfControls;
