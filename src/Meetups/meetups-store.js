import { writable } from 'svelte/store';

const meetups = writable([
  {
    id: "m1",
    title: "Coding Bootcamp",
    subtitle: "Learn code in 2 hours",
    description: "In this bootcamp, you will learn everything about code",
    imageUrl:
      "http://blog.hackerrank.com/wp-content/uploads/2014/08/Bootcamp.jpg",
    address: "27th Nerd Road, 1913LC Sevilla",
    contactEmail: "silvestre@hotmail.com",
    isFavorite: false
  },
  {
    id: "m2",
    title: "Swim Bootcamp",
    subtitle: "Learn to swim in 2 hours",
    description: "In this course, you will learn to swim",
    imageUrl:
      "http://lahinchseaworld.com/wp-content/uploads/2013/07/swimming-lesson.jpg",
    address: "27th Nerd Road, 1913LC Castilleja",
    contactEmail: "swim@hotmail.com",
    isFavorite: false
  }
]);


const customMeetupsStore = {
  subscribe: meetups.subscribe,
  addMeetup: (meetupData) => {
    const newMeetup = {
      ...meetupData,
      id: Math.random().toString(),
      isFavorite: false
    };

    meetups.update(items => [newMeetup, ...items]);
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
