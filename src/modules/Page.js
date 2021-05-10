import FilmList from './FilmList';
import Filter from './Filter';

class Page{

  constructor(wrap){
    this.filmList = new FilmList();
    this.filter = new Filter();
    this.wrap = wrap;
    wrap.onclick = this.onClick.bind(this);
  }

  view(itemId){
    const filmInfo = document.querySelector('.film-info');
    this.filmList.renderFilmInfo(+itemId, filmInfo);
    filmInfo.style.display = 'block';
  }

  delete(itemId){
    this.filmList.deleteFilm(+itemId);
    this.render();
  }

  onClick(){
    let action = event.target.parentNode.dataset.action;
    const itemId = event.target.parentNode.dataset.index;
    if(action){
      this[action](itemId);
    }
  }

  addFilm(){
    this.filmList.addFilm(this.getNewFilmData());
    this.render();
  }

  getNewFilmData(){
    const title = document.querySelector('#title'),
      director = document.querySelector('#director'),
      filmScript = document.querySelector('#filmScript'),
      country = document.querySelector('#country'),
      genre = document.querySelector('#genre'),
      producer = document.querySelector('#producer'),
      operator = document.querySelector('#operator'),
      composer = document.querySelector('#composer'),
      budget = document.querySelector('#budget'),
      worldFees = document.querySelector('#worldFees'),
      ageRating = document.querySelector('#ageRating'),
      duration = document.querySelector('#duration'),
      releaseDate = document.querySelector('#releaseDate'),
      poster = document.querySelector('#poster');
    



    const data = {
      id: this.filmList.generateItemId(),
      title: title.value,
      country: [],
      genre: [],
      director: director.value,
      filmScript: filmScript.value,
      producer: producer.value,
      operator: operator.value,
      composer: composer.value,
      budget: budget.value,
      worldFees: worldFees.value,
      ageRating: ageRating.value,
      duration: duration.value,
      releaseDate: releaseDate.valueAsNumber,
      poster: poster.value 
          === '' ? 'https://mimicosmetic.ru/wp-content/uploads/woocommerce-placeholder.png' : document.querySelector('#poster').value
    };

    country.value.split(',').forEach((item) => {
      data.country.push(item.trim().toLowerCase());
    });
    genre.value.split(',').forEach((item) => {
      data.genre.push(item.trim().toLowerCase());
    });



    title.value = '';
    director.value = '';
    filmScript.value = '';
    country.value = '';
    genre.value = '';
    producer.value = '';
    operator.value = '';
    composer.value = '';
    budget.value = '';
    worldFees.value = '';
    ageRating.value = '';
    duration.value = '';
    releaseDate.value = '';
    poster.value = '';
    country.value = '';
    genre.value = '';


    return data;
  }

  render(){
    this.filter.updateFilterData(this.filmList);
    this.filmList.render();
  }

  initEventListeners(){
    const btnShowForm = document.querySelector('#btnShowForm');
    const btnShowFilms = document.querySelector('#btnShowFilms');
    const filmInfo = document.querySelector('.film-info');
    const addFilmForm = document.querySelector('.add-film-form');
    const btnAddFilm = document.querySelector('#btnAddFilm');

    btnShowFilms.addEventListener('click', () => {
      filmInfo.style.display = 'none';
    });

    btnShowForm.addEventListener('click', () => {
      addFilmForm.classList.toggle('invisible');
    });

    btnAddFilm.addEventListener('click', () => {
      this.addFilm();
      this.render();
    });

    
    
  //-------------------------------------------------------------------
  // Filter events ----------------------------------------------------
  //-------------------------------------------------------------------

    const filterCountry = document.querySelector('#filterCountry');
    const filterGenre = document.querySelector('#filterGenre');
    const filterDate = document.querySelector('#filterDate');

    filterCountry.addEventListener('change', (event) => {
      this.filter.sortByCountry(this.filmList, event.target.value);
    });

    filterGenre.addEventListener('change', (event) => {
      this.filter.sortByGenre(this.filmList, event.target.value);
    });

    filterDate.addEventListener('change', (event) => {
      this.filter.sortByNewest(this.filmList, event.target.value);
    });
  //-------------------------------------------------------------------
  //-------------------------------------------------------------------
  }
}

export default Page;