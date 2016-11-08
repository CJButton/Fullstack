


import React from 'react';
import Slider from 'react-slick';


import { createBookshelf } from '../../actions/bookshelf_actions';

class Bookshelf extends React.Component{
  constructor(props) {
    super(props);

  }


  update(property) {
    return e => this.setState({[property]: e.target.value});
  }

  pictureRedirect() {

  }

  render() {
    return (
      <div className="bookshelfMain">
        <div className="bookshelfLeft">
          Left Container
        </div>
          <div className="bookshelfContainer">
              <div className="bookshelfComicShow">
              {
                this.props.bookshelf.map((comic, i) => (
                <element className="comicDisplayWrapper">
                  <ul className="comicInfoDisplay">

                    <a href={`#/manga/${comic.id}`}>
                      <img className="bookshelfPicture" src={comic.img_url}/>
                    </a>
                    <ul className="bookshelfComicText">
                      <li className="bookshelfTitle">{comic.title}</li>
                      <li>by {comic.author}</li>

                    </ul>
                  </ul>
                </element>
                  )
                    )
              }
            </div>
          </div>
    </div>
    );
  }
}


export default Bookshelf;
