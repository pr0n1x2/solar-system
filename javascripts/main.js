let planet = null;
let previousPlanet = null;

let presentationContainer = null;

let planetContainer = null;
let planetAtmosphere = null;
let planetElement = null;

let descElement = null;
let textElement = null;

let planetName = null;
let planetDescription = null;

let factContainers = null;

let menuContainer = null;

const factColorAssotiations = [
    {name: 'white', value: 'fact-text-white-color'},
    {name: 'blue', value: 'fact-text-blue-color'},
    {name: 'orange', value: 'fact-text-orange-color'},
    {name: 'red', value: 'fact-text-red-color'}
];

const delay = (time) => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, time);
    });
};

const setPlanet = (planetObj) => {
    planet = planetObj;
}

const getPlanet = (name) => {
    return new Promise((resolve, reject) => {
        const url = `/planet/${name}`;

        return fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((planetObj) => {
                planets.push(planetObj);
                resolve(planetObj);
            })
            .catch(() => {
                planet = false;
            });
    });
}

const getPlanetFromCache = (name) => {
    return new Promise((resolve, reject) => {
        let isFindPlanetInCache = false;

        for (let i = 0; i < planets.length; i++) {
            if (planets[i].name === name) {
                isFindPlanetInCache = true;
                resolve(planets[i]);
                break;
            }
        }

        if (!isFindPlanetInCache) {
            reject(name);
        }
    });
}

const fact = (name, value, nameColor, valueColor, containerIndex) => {
    const container = factContainers[containerIndex].querySelector('.fact');
    const nameContainer = container.querySelector('.fact-name');
    const valueContainer = container.querySelector('.fact-value');

    for (let color of factColorAssotiations) {
        if (nameContainer.classList.contains(color.value)) {
            nameContainer.classList.remove(color.value);
        }

        if (valueContainer.classList.contains(color.value)) {
            valueContainer.classList.remove(color.value);
        }
    }

    nameContainer.innerText = name;
    valueContainer.innerText = value;

    for (let color of factColorAssotiations) {
        if (nameColor === color.name) {
            nameContainer.classList.add(color.value);
            break;
        }
    }

    for (let color of factColorAssotiations) {
        if (valueColor === color.name) {
            valueContainer.classList.add(color.value);
            break;
        }
    }

    container.classList.add('scale-fact-up');
};

const description = (text) => {
    const prom = delay(0);

    if (descElement.classList.contains('description-hide')) {
        descElement.classList.remove('description-hide');
        descElement.classList.add('description-show');
    }

    prom
        .then(() => {
            if (descElement.classList.contains('scale-description-up')) {
                descElement.classList.remove('scale-description-up');

                return delay(400);
            }

            return delay(0);
        })
        .then(() => {
            textElement.innerText = text;
            return delay(100);
        })
        .then(() => {
            descElement.classList.add('scale-description-up');
        });
};

const button = (top, left, text) => {
    let el = document.createElement('button');

    el.style.top = top;
    el.style.left = left;

    el.addEventListener('click', () => {
        description(text);
    });

    delay(100)
        .then(() => {
            el = planetAtmosphere.appendChild(el);
            return delay(100);
        })
        .then(() => {
            el.classList.add('scale-button-up');
        });
};

const showPlanet = () => {
    delay(0)
        .then(() => {
            if (previousPlanet !== null) {
                planetElement.classList.remove(previousPlanet.name);
            }

            planetElement.classList.add(planet.name);
            return delay(200);
        })
        .then(() => {
            planetContainer.classList.remove('scale-down');
            planetContainer.classList.add('scale-up');
            return delay(7000);
        })
        .then(() => {
            planetContainer.classList.add('gravity');

            planetName.innerText = planet.planetName;
            planetDescription.innerText = planet.planetDescription;

            return delay(500);
        })
        .then(() => {
            planetName.classList.add('scale-planet-description-up');
            return delay(500);
        })
        .then(() => {
            planetDescription.classList.add('scale-planet-description-up');
            return delay(500);
        })
        .then(() => {
            for (let i = 0; i < planet.facts.length; i++) {
                setTimeout(() => {
                    fact(
                        planet.facts[i].name,
                        planet.facts[i].value,
                        planet.facts[i].nameColor,
                        planet.facts[i].valueColor,
                        i
                    );
                }, i * 300);
            }

            return delay(500);
        })
        .then(() => {
            for (let i = 0; i < planet.points.length; i++) {
                setTimeout(() => {
                    button(planet.points[i].top, planet.points[i].left, planet.points[i].text);
                }, i * 300);
            }

            return delay(1000);
        })
        .then(() => {
            menuContainer.classList.add('scale-menu-up');
        });
}

const hidePlanet = () => {
    delay(0)
        .then(() => {
            menuContainer.classList.remove('scale-menu-up');
            return delay(500);
        })
        .then(() => {
            if (descElement.classList.contains('description-show')) {
                delay(0)
                    .then(() => {
                        descElement.classList.remove('scale-description-up');
                        return delay(300);
                    })
                    .then(() => {
                        descElement.classList.remove('description-show');
                        descElement.classList.add('description-hide');
                    });
            }

            return delay(500);
        })
        .then(() => {
            const buttons = planetAtmosphere.querySelectorAll('button');

            for (let i = 0; i < buttons.length; i++) {
                setTimeout(() => {
                    // buttons[i].removeEventListener('click', null);
                    buttons[i].remove();
                }, i * 300);
            }

            return delay(500);
        })
        .then(() => {
            let timer = 0;

            for (let i = 3; i >= 0; i--) {
                setTimeout(() => {
                    factContainers[i].firstChild.classList.remove('scale-fact-up');
                },timer * 300);

                timer++;
            }

            return delay(500);
        })
        .then(() => {
            planetDescription.classList.remove('scale-planet-description-up');
            return delay(500);
        })
        .then(() => {
            planetName.classList.remove('scale-planet-description-up');
            return delay(500);
        })
        .then(() => {
            planetContainer.classList.remove('scale-up');
            planetContainer.classList.add('scale-down');
            return delay(5000);
        })
        .then(() => {
            showPlanet();
        });
}

window.addEventListener('load', () => {
    planetContainer = document.querySelector('.ratio');
    planetAtmosphere = document.querySelector('.ratio-inner');
    planetElement = planetContainer.querySelector('.ratio-content');

    presentationContainer = document.querySelector('.presentation');

    planetName = document.querySelector('.planet-name');
    planetDescription = document.querySelector('.planet-description');

    descElement = document.querySelector('.description');
    textElement = descElement.querySelector('.text');

    factContainers = document.querySelectorAll('div.facts ul li');

    menuContainer = document.querySelector('nav');

    let audio = new Audio('music/music.mp3');
    audio.play();

    const menuLinks = menuContainer.querySelectorAll('a');

    for (let i = 0; i < menuLinks.length; i++) {
        menuLinks[i].addEventListener('click', (event) => {
            const dataPlanet = event.currentTarget.dataset['planet'];

            if (planet.name === dataPlanet) {
                return false;
            }

            const animationIteration = (event) => {
                if (event.animationName == 'swing') {
                    event.currentTarget.classList.remove('gravity');
                    event.currentTarget.removeEventListener("animationiteration", animationIteration);
                }
            }

            planetContainer.addEventListener("animationiteration", animationIteration);

            previousPlanet = planet;

            getPlanetFromCache(dataPlanet)
                .then(setPlanet)
                .catch((name) => {
                    getPlanet(name).then(setPlanet);
                });

            hidePlanet();
        });
    }

    getPlanetFromCache('sun')
        .then((name) => {
            return setPlanet(name);
        })
        .then(() => {
            return delay(3000);
        })
        .then(() => {
            presentationContainer.classList.add('scale-presentation-up');
            return delay(7000);
        })
        .then(() => {
            presentationContainer.classList.add('scale-presentation-down');
            return delay(5000);
        })
        .then(() => {
            presentationContainer.remove();
            menuContainer.classList.remove('menu-hidden');
            return delay(1000);
        })
        .then(() => {
            showPlanet();
        });
});