


import React from 'react';

import { createBookshelf } from '../../actions/bookshelf_actions';
import BookshelfSidebar from '../sidebar/sidebar_container';


class Bookshelf extends React.Component{
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className="bookshelfMain">
        <BookshelfSidebar className="bookshelfLeft">
        </BookshelfSidebar >
          <div className="bookshelfContainer">
              <div className="bookshelfComicShow">
                <br></br>
                      Your collection:
                <br></br>
              {

                this.props.manga.map((comic, i) => (
                <element key={i} className="comicDisplayWrapper">
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
