<script>
  import Header from "./UI/Header.svelte";
  import MeetupGrid from "./Meetups/MeetupGrid.svelte";
  import TextInput from "./UI/TextInput.svelte";
  import Button from "./UI/Button.svelte";
  import EditMeetup from "./Meetups/EditMeetup.svelte";
  import MeetupDetail from "./Meetups/MeetupDetail.svelte";
  import meetups from "./Meetups/meetups-store.js";

  let _editMode;
  let _id;
  let page = "overview";

  function addMeetup(event) {
    _editMode = null;
  }

  function cancelEdit() {
    _editMode = null;
  }

  function showDetails(event) {
    page = "details";
    _id = event.detail;
  }

  function closeDetails() {
    page = "overview";
    _id = undefined;
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
  {#if page === 'overview'}
    <div class="meetup-controls">
      <Button on:click={() => (_editMode = 'Add')}>New meetup</Button>
    </div>
    {#if _editMode === 'Add'}
      <EditMeetup on:save={addMeetup} on:cancel={cancelEdit} />
    {/if}
    <MeetupGrid meetups={$meetups} on:showdetails={showDetails} />
  {:else if page === 'details'}
    <MeetupDetail id={_id} on:close={closeDetails} />
  {/if}
</main>
