<script>
  import { createEventDispatcher } from "svelte";
  import { scale, fade } from "svelte/transition";
  import { flip } from "svelte/animate";
  import MeetupItem from "./MeetupItem.svelte";
  import MeetupFilter from "./MeetupFilter.svelte";
  import Button from "../UI/Button.svelte";

  export let meetups;
  const dispatch = createEventDispatcher();

  let _favsOnly = false;

  $: filteredMeetups = _favsOnly ? meetups.filter(m => m.isFavorite) : meetups;

  function setFilter(event) {
    _favsOnly = event.detail === 1;
  }
</script>

<style>
  #meetups {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
  }

  #meetup-controls {
    margin: 1rem;
    display: flex;
    justify-content: space-between;
  }

  #no-meetups {
    margin: 1rem;
  }

  @media (min-width: 768px) {
    #meetups {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>

<section id="meetup-controls">
  <MeetupFilter on:select={setFilter} />
  <Button on:click={() => dispatch('add')}>New meetup</Button>
</section>
<section id="meetups">
  {#if filteredMeetups.length === 0}
    <p id="no-meetups" in:fade={{ delay: 400 }}>No meetups found</p>
  {:else}
    {#each filteredMeetups as meetup (meetup.id)}
      <div animate:flip={{ duration: 200 }} transition:scale>
        <MeetupItem
          id={meetup.id}
          title={meetup.title}
          subtitle={meetup.subtitle}
          imageUrl={meetup.imageUrl}
          description={meetup.description}
          email={meetup.contactEmail}
          address={meetup.address}
          isFav={meetup.isFavorite}
          on:showdetails
          on:edit />
      </div>
    {/each}
  {/if}
</section>
