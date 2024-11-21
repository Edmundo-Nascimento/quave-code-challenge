import { Meteor } from 'meteor/meteor';
import { loadInitialData } from '../infra/initial-data';
import { People } from '../people/people';
import { Communities } from '../communities/communities';


Meteor.startup(async () => {
  // DON'T CHANGE THE NEXT LINE
  await loadInitialData();

  // YOU CAN DO WHATEVER YOU WANT HERE
  Meteor.publish('communities', function () {
    return Communities.find();
  });
  
  Meteor.publish('people', function (communityId, page, limit) {
    return People.find(
      { communityId }
    );
  });
  
  Meteor.methods({
    'people.checkIn': function (personId) {
      People.updateAsync(personId, { $set: { checkInDate: new Date() } });
    },
    'people.checkOut': function (personId) {
      People.updateAsync(personId, { $set: { checkOutDate: new Date() } });
    },
  });

});
