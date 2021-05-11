class Comment{
  constructor(filmIndex, name, profession, text, filmRating){
    this.filmIndex = filmIndex;
    this.name = name;
    this.profession = profession;
    this.text = text;
    this.filmRating = filmRating;
  }

  renderComment(filmWrap){
    filmWrap.innerHTML += `
      <div class="film-comment" id="${this.filmIndex + this.name}">
        <span>${this.name} - ${this.profession} - ${this.filmRating}</span>
        <span style="display: block;">${this.text}</span>
      </div>
    `;
  }
}

export default Comment;