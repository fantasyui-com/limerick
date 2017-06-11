const {as, Player, Actor, Room, Item, Location, Container, Action } = require(__dirname+'/index.js');

const player = new Player({names:['I'], descriptions:['The lonely I', 'The lonesome me']});

player.on('start', ['{{actor name}} enter {{location description}} by A. E. Mouse'])
player.on('finish', ['And my journey quietly ends in {{location description}}...', '{{location description}} envelop me and take me over'])

const evening = new Container({names: ['evening'], descriptions:['evening', 'darkest evening of the year'] });

const woods = new Container({names: ['woods'], descriptions:['lovely woods', 'dark and deep woods'] });
woods.on('enter', ['Mmm, the {{location description}} are lovely dark and deep'])
woods.on('leave', [
  'Leaving {{location description}} and entering {{destination description}}',
  'I must escape {{location description}} in hopes of to reaching {{destination description}}',
  'I set course for {{destination description}}',
])

evening.join(woods, as.container);

const horse = new Actor({names: ['horse'], descriptions:['curious horse'] });
horse.on('proximity', ['{{item description}} gives his bells a shake', 'But the damn {{item description}} makes a strange sound']);

woods.join(horse, as.thing);

const lake = new Container({names: ['lake'], descriptions:['frozen lake waters'] });
lake.on('enter', ['Brr, the {{location description}} is sweet and welcoming to no end'])
const fish = new Item({names: ['fish'], descriptions:['silent fish'] });
fish.on('discovery', ['{{actor description}} finds {{item description}}'])
lake.join(fish, as.thing);

const village = new Container({names: ['village'], descriptions:['A quiet village'] });
village.on('enter', ['The sound of silence rings in my ears.']);

const house = new Container({names: ['house'], descriptions:['the houses, the houses'] });
house.on('enter', ['I greet the being that owns the woods.']);

woods.join(lake, as.container);
woods.join(village, as.container);
village.join(house, as.container);

player.enter(woods);
while(player.move()){}
