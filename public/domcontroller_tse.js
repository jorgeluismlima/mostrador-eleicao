/* eslint-disable no-unused-vars */
// Data ====
const cities = [
    { name: 'Dourados', uf: 'ms' },
    { name: 'Três Lagoas', uf: 'ms' },
    { name: 'Campo Grande', uf: 'ms' },
    { name: 'Porto Velho', uf: 'ro' },
    { name: 'São Luiz', uf: 'rr' },
    { name: 'Taquarussu', uf: 'ms' },
    { name: 'Belém', uf: 'pa' },
    { name: 'Itaocara', uf: 'rj' },
    { name: 'Rio de Janeiro', uf: 'rj' },
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
  
