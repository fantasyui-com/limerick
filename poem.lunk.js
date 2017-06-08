const { Actor, Room, Item, Location } = require('./library.js');


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

const lunk = new Actor(
  ['Lunk'],
  ['Ricky the Lunk'],
  {language},
);

const gym = new Room( ['gym'], ['house of pain'] );
const frontDesk = new Room( ['front desk'], ['busy front desk'] );
const staff = new Item( ['front desk staff'], ['busy staff'] );

const restroom = new Room( ['restroom'], ['stuffy restroom'] );
const battery = new Room( ['battery'], ['powerful battery'] );
const nothing = new Room( ['nothing'], ['nothing'] );

gym.contains(frontDesk);
frontDesk.has(staff);

['Squat Station', 'Barbells', 'Bench Press', 'Incline Bench Press', 'Hammer Strength machine', 'Cables and Pulleys', 'Dumb Bells', 'Pull Up Bar', 'Lat Pull Down Machine', 'Leg Extension Machine', 'Leg Curl Machine', 'Hyper Extension Bench', 'Dipping Bars', 'Smith Machine', 'Rowing Machine', 'Glute Ham Developer', 'Preacher Bench', 'Abdominal Bench', 'Leg Press machine', 'Hack Squat Machine', 'Calf Machines', 'Leg Adduction / Abduction Machine', 'Pec Deck Machine', 'Kettle Bells',]
.forEach(i=>gym.contains( new Room( [i], [i] ) )

lunk.enterInto(gym);

while(actor.move()){}
