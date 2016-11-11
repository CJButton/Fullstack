import React from 'react';

class MangaShow extends React.Component{
 constructor(props) {
   super(props);
   // this.bookshelfIds = this.props.bookshelves.map((shelf) => {
   //     return shelf.id;
   //   });
   this.isChecked = this.isChecked.bind(this);
   this.toggle = this.toggle.bind(this);
   this.handleStatus = this.handleStatus.bind(this);
 }


 toggle(shelfId, mangaId) {
   this.props.toggleShelf(shelfId, mangaId);
 }

 // componentWillReceiveProps(newProps) {
 //   let checkboxes = {};
 //
 //   newProps.bookshelves.forEach((shelf) => {
 //     checkboxes[shelf.id] = this.isChecked(shelf.id);
 //   });
 //   this.setState(checkboxes);
 // }

 componentDidMount() {
   this.props.requestAllBookshelves();
 }

 isChecked(myShelfId) {
   this.bookshelfIds = Object.keys(this.props.booksonshelves).map((key) => {
     return this.props.booksonshelves[key].bookshelf_id;
   });

   let checked = "false";
   this.bookshelfIds.forEach((id) => {
     if (parseInt(id) === myShelfId) {
       checked = "true";
     }
   });
   return checked;
 }

 // 1. need to send the manga to the approriate bookshelf
 // 2. have to update the status as well
 handleStatus(e) {
   console.log(this.props.routeParams.id);
  this.props.changeMangaStatus(e.target.value, this.props.routeParams.id);


 }

 render() {
   console.log(this.props);

   return (
   <div className="single-manga-show">
     <div className="single-manga-picture">
       <li><img className="manga-picture-show"
                src={this.props.manga.img_url} width="210" height="300"/></li>

     </div>
     <ul className="single-manga-words">
       <li className="mangaHomeTitle">{this.props.manga.title}</li>
       <br></br>
       <li>by {this.props.manga.author}</li>
       <br></br>
       <li className="mangaHomeWords">{this.props.manga.synopsis}</li>

       //
       <select value={this.props.status} onChange={this.handleStatus}>
         <option>Choose a shelf!</option>
         <option value="Currently-Reading">Currently-Reading</option>
         <option value="Read">Read</option>
         <option value="Want-To-Read">Want-To-Read</option>
       </select>

         {this.props.bookshelves.map((shelf, index) => {

           console.log(this.isChecked(shelf.id));
           return (
             <li key={shelf.id}>
               <label>
                 <i
                   className={"Shelf-answer-checkbox" + " " + this.isChecked(shelf.id)}
                   onClick={this.toggle.bind(this, shelf.id, this.props.manga.id)}
                   value={index}>
                   {this.isChecked(shelf.id)}
                   </i>
                 {shelf.title}
               </label>
             </li>
           );
         })}
     </ul>


   </div>
   );
 }
}

export default MangaShow;
