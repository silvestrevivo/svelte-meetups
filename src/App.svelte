<script>
  import Header from "./UI/Header.svelte";
  import MeetupGrid from "./Meetups/MeetupGrid.svelte";
  import TextInput from "./UI/TextInput.svelte";
  import Button from "./UI/Button.svelte";
  import EditMeetup from "./Meetups/EditMeetup.svelte";
  import MeetupDetail from "./Meetups/MeetupDetail.svelte";
  import LoadingSpinner from "./UI/LoadingSpinner.svelte";
  import meetups from "./Meetups/meetups-store.js";

  let _editMode;
  let _id;
  let _editedId;
  let _page = "overview";

  const meetupsPromise = fetch(
    "https://svelte-meetups-635c8.firebaseio.com/meetups.json"
  )
    .then(res => {
      if (!res.ok) {
        throw new Error("Fetching meetups failed, please try again later!");
      }
      return res.json();
    })
    .then(data => {
      const loadedMeetups = [];
      for (const key in data) {
        loadedMeetups.push({
          ...data[key],
          id: key
        });
      }
      meetups.setMeetups(loadedMeetups);
      // equivalent to reset the values fetching from the server
    })
    .catch(err => console.log(err));

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
</style>

<Header />
<main>
  {#if _page === 'overview'}
    {#if _editMode === 'edit'}
      <EditMeetup on:save={savedMeetup} on:cancel={cancelEdit} id={_editedId} />
    {/if}
    {#await meetupsPromise}
      <LoadingSpinner />
    {:then value}
      <MeetupGrid
        meetups={$meetups}
        on:showdetails={showDetails}
        on:edit={startEdit}
        on:add={() => (_editMode = 'edit')} />
    {/await}
  {:else if _page === 'details'}
    <MeetupDetail id={_id} on:close={closeDetails} />
  {/if}
</main>
