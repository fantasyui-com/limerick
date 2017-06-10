const {as, Player, Actor, Room, Item, Location, Container, Action } = require(__dirname+'/index.js');

const player = new Player( ['I'], ['The lonely I', 'The lonesome me'] );

player.on('start', ['{{actor name}} enter {{location description}} by A. E. Mouse'])
player.on('finish', ['Journey ends in {{location description}}', '{{location description}} envelop me and take me over'])

const evening = new Container( ['evening'], ['evening', 'darkest evening of the year'] );

const woods = new Container( ['woods'], ['lovely woods', 'dark and deep woods'] );
woods.on('enter', ['Mmm, the {{location description}} are lovely dark and deep'])
woods.on('leave', ['Leaving {{location description}} and entering {{destination description}}'])

evening.join(woods, as.container);

const horse = new Actor( ['horse'], ['horse'] );
const bells = new Item( ['bells'], ['harness bells'] );
bells.on('discovery', ['{{actor description}} finds {{item description}}'])
const shake = new Action( ['shake'], ['bells shake'] );
horse.join(bells, as.thing);
bells.join(shake, as.action);
woods.join(horse, as.thing);

const lake = new Container( ['lake'], ['frozen lake waters'] );
lake.on('enter', ['Brr, the {{location description}} is sweet and welcoming to no end'])
const fish = new Item( ['fish'], ['silent fish'] );
fish.on('discovery', ['{{actor description}} finds {{item description}}'])
lake.join(fish, as.thing);

const village = new Container( ['village'], ['A quiet village'] );
village.on('enter', ['The sound of silence rings in my ears.']);

const house = new Container( ['house'], ['the houses, the houses'] );
house.on('enter', ['I greet the being that owns the woods.']);

woods.join(lake, as.container);
woods.join(village, as.container);
village.join(house, as.container);

player.enter(woods);
while(player.move()){}
