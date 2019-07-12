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
  let _editedId;
  let _page = "overview";

  function savedMeetup(event) {
    _editMode = null;
    _editedId = null;
  }

  function cancelEdit() {
    _editMode = null;
    _editedId = null;
  }

  function showDetails(event) {
    _page = "details";
    _id = event.detail;
  }

  function closeDetails() {
    _page = "overview";
    _id = undefined;
  }

  function startEdit(event) {
    _editMode = "edit";
    _editedId = event.detail;
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
  {#if _page === 'overview'}
    <div class="meetup-controls">
      <Button on:click={() => (_editMode = 'edit')}>New meetup</Button>
    </div>
    {#if _editMode === 'edit'}
      <EditMeetup on:save={savedMeetup} on:cancel={cancelEdit} id={_editedId} />
    {/if}
    <MeetupGrid
      meetups={$meetups}
      on:showdetails={showDetails}
      on:edit={startEdit} />
  {:else if _page === 'details'}
    <MeetupDetail id={_id} on:close={closeDetails} />
  {/if}
</main>
