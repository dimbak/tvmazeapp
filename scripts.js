const app = document.getElementById('demo-root');
let episodes_container = document.createElement('div')
episodes_container.setAttribute('id','episodes-container')
episodes_container.setAttribute('class','row')
app.appendChild(episodes_container)

document.getElementById('dim-series-name').addEventListener('change',clearContents, false)
document.getElementById('dim-series-season').addEventListener('change',clearContents, false)

function clearContents(){

   var element = document.getElementById('episodes-container')
    element.innerHTML = '';
}

var b = document.getElementById("my-submit");
b.addEventListener("click", handleButton1, false);

function handleButton1() 
{ 
  
  var series_name   = document.getElementById('dim-series-name').value ? document.getElementById('dim-series-name').value : 'lost' ;
  var series_season = document.getElementById('dim-series-season').value ? document.getElementById('dim-series-season').value : 1;

  var request = new XMLHttpRequest();
  console.log(series_name)
  

  var get_show_id = 'https://api.tvmaze.com/singlesearch/shows?q=';  
  request.open('GET', get_show_id+series_name+'&embed=episodes', true);
  
  request.send();
  
  request.onload = function() {
    theCallback(request.response, series_season); 

  }
  event.preventDefault();
}

function theCallback(rr, series_season) {
 
  let data = JSON.parse(rr);
  
  let the_ar = data._embedded.episodes;
  let seasons_episodes = the_ar.filter(theCallback1)

  function theCallback1(value, index) {
    return value.season == series_season;
  }

  displayData(seasons_episodes)
}  

function displayData(seasons_episodes) {

  let number_of_episodes = seasons_episodes.length;
  
  for ( let i = 0; i< number_of_episodes; i++) {
    const card_container = document.createElement('div');
    card_container.setAttribute('class','col-sm');
    const card = document.createElement('div');
    card.setAttribute('class', 'card');

    const card_img = document.createElement('img');
    card_img.setAttribute('class','img-thumnail')

    if (seasons_episodes[i].image ) {
      card_img.src = seasons_episodes[i].image.medium;  
    } 
    else {
      card_img.src = "";
    }

    card_img.src = seasons_episodes[i].image ? seasons_episodes[i].image.medium : '' ;

    const card_body = document.createElement('div');
    card_body.setAttribute('class','card-body');

    const h1 = document.createElement('a');
    h1.href = seasons_episodes[i].url;
    h1.textContent = seasons_episodes[i].name;

    const summary = document.createElement('p');
    const summary_content = seasons_episodes[i].summary;
    summary.innerHTML = summary_content;

    
    const airtime = document.createElement('p');
    airtime.textContent = "airtime " + seasons_episodes[i].airdate;



    episodes_container.appendChild(card_container);
    card_container.appendChild(card)
    card.appendChild(card_img)

    card.appendChild(card_body)
    
    card_body.appendChild(h1);
    card_body.appendChild(summary)
    card_body.appendChild(airtime)
  } 
}    
