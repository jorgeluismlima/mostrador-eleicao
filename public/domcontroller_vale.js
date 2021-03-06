/* eslint-disable no-unused-vars */
// Data ====
const cities = [
  {name: 'Aparecida', uf: 'sp',},
  {name: 'Arapeí', uf: 'sp',},
  {name: 'Areias', uf: 'sp',},
  {name: 'Bananal', uf: 'sp',},
  {name: 'Caçapava', uf: 'sp',},
  {name: 'Cachoeira Paulista', uf: 'sp',},
  {name: 'Canas', uf: 'sp',},
  {name: 'Cruzeiro', uf: 'sp',},
  {name: 'Cunha', uf: 'sp',},
  {name: 'Guaratinguetá', uf: 'sp',},
  {name: 'Jacareí', uf: 'sp',},
  {name: 'Jambeiro', uf: 'sp',},
  {name: 'Lagoinha', uf: 'sp',},
  {name: 'Lavrinhas', uf: 'sp',},
  {name: 'Lorena', uf: 'sp',},
  {name: 'Natividade da Serra', uf: 'sp',},
  {name: 'Paraibuna', uf: 'sp',},
  {name: 'Pindamonhangaba', uf: 'sp',},
  {name: 'Piquete', uf: 'sp',},
  {name: 'Potim', uf: 'sp',},
  {name: 'Queluz', uf: 'sp',},
  {name: 'Redenção da Serra', uf: 'sp',},
  {name: 'Roseira', uf: 'sp',},
  {name: 'Santa Branca', uf: 'sp',},
  {name: 'São José do Barreiro', uf: 'sp',},
  {name: 'São José Dos Campos', uf: 'sp',},
  {name: 'São Luís do Paraitinga', uf: 'sp',},
  {name: 'Silveiras', uf: 'sp',},
  {name: 'Taubaté', uf: 'sp',},
  {name: 'Tremembé', uf: 'sp',},
  ].sort((a, b) => {
    const textA = a.name.toUpperCase();
    const textB = b.name.toUpperCase();
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
  });
  
  const cityDOM = document.querySelector('#city');
  const roleDOM = document.querySelector('#role');
  // const socket = io("http://localhost:3000");
  
  // Functions ====
  
  /**
   * Gets the city selected in the DOM form
   * @return {String} The name of the city selected
   */
  function getCity() {
    return cityDOM.selectedOptions[0].value;
  }
  
  
  /**
   * Gets the role selected in the DOM form
   * @return {String} The name of the role selected
   */
  function getRole() {
    return roleDOM.selectedOptions[0].value;
  }

  // function for remove child <p>
function hidep() {
  var p_list = document.getElementsByTagName("p");
  for(var i=p_list.length-1; i>=0; i--){
      var p = p_list[i];
      // if(p.className === "goup"){
          p.parentNode.removeChild(p);
      // }
  }
}
  
  /**
   * Updates all of the DOM elements when called.
   * It will get what is in the form and will get the data and show it.
   */
  async function changedForm() {
    const varfile = await getStoredFile(getCity(), getRole());
  
    Object.keys(fileCache).forEach((electionName) => {
      if (fileCache[electionName].role == getRole().toLowerCase()) {
        const thisCityElement = document.getElementById(fileCache[electionName].nl
            .replaceAll(' ', '-')
            .toLowerCase());
        if (checkElected(fileCache[electionName]) == 'eleito') {
          thisCityElement.textContent = `${fileCache[electionName].nl} ✅`;
        } else if (
          checkElected(fileCache[electionName]) == 'matematicamente'
        ) {
          thisCityElement.textContent = `${fileCache[electionName].nl} ⚠`;
        } else if (!checkElected(fileCache[electionName])) {
          thisCityElement.textContent = `${fileCache[electionName].nl} ❌`;
        }
      }
    });
  
    // call function hidep
    hidep();

    plotVotesPerCandidate(varfile);
    generateCandTable(varfile);
    generateNullVotesTable(varfile);
    plotUrnasApuradas(varfile);
  }
  
  // On page load put all registered cities ====
  cities.forEach((city) => {
    // eslint-disable-next-line prefer-const
    let currCityOption = document.createElement('option');
    currCityOption.id = city.name.replaceAll(' ', '-').toLowerCase();
    currCityOption.value = city.name.toUpperCase();
    currCityOption.textContent = city.name.toUpperCase();
    cityDOM.appendChild(currCityOption);
  });

  // function for Countdown Bar
function ProgressCountdown(timeleft, bar) {
  return new Promise((resolve, reject) => {
    var countdownTimer = setInterval(() => {
      timeleft--;
      document.getElementById(bar).value = timeleft;
      if (timeleft <= 0) {
        clearInterval(countdownTimer);
        resolve(true);
        getFiles();
      }
    }, 1000);
  });
}
  
  askNotificationPermission();
  
  getFiles();
  
