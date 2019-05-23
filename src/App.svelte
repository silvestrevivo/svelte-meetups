<script>
  import Header from "./UI/Header.svelte";
  import MeetupGrid from "./Meetups/MeetupGrid.svelte";
  import TextInput from "./UI/TextInput.svelte";
  import Button from "./UI/Button.svelte";
  import EditMeetup from "./Meetups/EditMeetup.svelte";

  let _editMode;

  let meetups = [
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
  ];

  function addMeetup(event) {
    const {
      title,
      subtitle,
      email,
      description,
      address,
      imageUrl
    } = event.detail;
    const newMeetup = {
      id: Math.random().toString(),
      title,
      subtitle,
      email,
      description,
      address,
      imageUrl,
      contactEmail: email
    };

    meetups = [newMeetup, ...meetups];
    _editMode = null;
  }

  function toggleFavorite(event) {
    const id = event.detail;
    const updatedMeetup = { ...meetups.find(m => m.id === id) };
    updatedMeetup.isFavorite = !updatedMeetup.isFavorite;
    const meetupIndex = meetups.findIndex(m => m.id === id);
    const updatedMeetups = [...meetups];
    updatedMeetups[meetupIndex] = updatedMeetup;
    meetups = updatedMeetups;
  }

  function cancelEdit() {
    _editMode = null;
  }
</script>

<style>
  main {
    margin-top: 5rem;
  }
  .meetup-controls {
    margin: 1rem;
  }
</style>

<Header />
<main>
  <div class="meetup-controls">
    <Button on:click={() => (_editMode = 'Add')}>New meetup</Button>
  </div>
  {#if _editMode === 'Add'}
    <EditMeetup on:save={addMeetup} on:cancel={cancelEdit} />
  {/if}
  <MeetupGrid {meetups} on:toggleFavorite={toggleFavorite} />
</main>
