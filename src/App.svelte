<script>
  import Header from "./UI/Header.svelte";
  import MeetupGrid from "./Meetups/MeetupGrid.svelte";
  import TextInput from "./UI/TextInput.svelte";
  import Button from "./UI/Button.svelte";
  import EditMeetup from "./Meetups/EditMeetup.svelte";
  import meetups from "./Meetups/meetups-store.js";

  let _editMode;

  function addMeetup(event) {
    const {
      title,
      subtitle,
      email,
      description,
      address,
      imageUrl
    } = event.detail;
    const meetupData = {
      title,
      subtitle,
      email,
      description,
      address,
      imageUrl,
      contactEmail: email
    };

    meetups.addMeetup(meetupData);
    _editMode = null;
  }

  function toggleFavorite(event) {
    const id = event.detail;
    meetups.toogleFavorite(id);
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
  <MeetupGrid meetups={$meetups} on:toggleFavorite={toggleFavorite} />
</main>
