const {as, Player, Actor, Room, Item, Location, Container, Action } = require(__dirname+'/index.js');


const language = {

  poemTitles: [
    '{{actor_name}} enters {{location_name}}',
  ],

  closingLines: [
    'Journey ends in {{location_name}}',
  ],

  itemInteractions: [
    '{{actor_name}} finds {{item_name}}',
  ],

  locationTransitions: [
    'Leaving {{location_name}} and entering {{destination_name}}',
  ],

};

const player = new Player(
  ['I'],
  ['I'],
  {language},
);


const evening = new Container( ['evening'], ['evening', 'darkest evening of the year'] );
const woods = new Container( ['woods'], ['lovely woods', 'dark and deep woods'] );
evening.join(woods, as.container);

const horse = new Actor( ['horse'], ['horse'] );
const bells = new Item( ['bells'], ['harness bells'] );
const shake = new Action( ['shake'], ['bells shake'] );
horse.join(bells, as.thing);
bells.join(shake, as.action);
woods.join(horse, as.thing);

const lake = new Container( ['lake'], ['frozen lake'] );
const village = new Container( ['village'], ['village'] );
const house = new Container( ['house'], ['house'] );
woods.join(lake, as.container);
woods.join(village, as.container);
village.join(house, as.container);

player.enter(woods);
while(player.move()){}
