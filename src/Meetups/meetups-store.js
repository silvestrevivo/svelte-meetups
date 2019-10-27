import { writable } from 'svelte/store';

const meetups = writable([]);

const customMeetupsStore = {
  subscribe: meetups.subscribe,
  setMeetups: (items) => meetups.set(items),
  addMeetup: (meetupData) => {
    // const newMeetup = {
    //   ...meetupData,
    // }; //* this is not needed anymore
    meetups.update(items => [meetupData, ...items]);
  },
  updateMeetup: (id, meetupData) => {
    meetups.update(items => {
      const meetupIndex = items.findIndex(i => i.id === id);
      const updatedMeetup = {...meetups[meetupIndex], ...meetupData};
      const updatedMeetups = [...items];
      updatedMeetups[meetupIndex] = updatedMeetup;
      return updatedMeetups;
    })
  },
  removeMeetup: (id) => {
    meetups.update(items => {
      return items.filter(i => i.id !== id);
    })
  },
  toogleFavorite: (id) => {
    meetups.update(items => {
      const updatedMeetup = { ...items.find(m => m.id === id) };
      updatedMeetup.isFavorite = !updatedMeetup.isFavorite;
      const meetupIndex = items.findIndex(m => m.id === id);
      const updatedMeetups = [...items];
      updatedMeetups[meetupIndex] = updatedMeetup;
      return updatedMeetups;
    })
  }
}
export default customMeetupsStore;
