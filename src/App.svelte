<script>
  import Header from "./UI/Header.svelte";
  import MeetupGrid from "./Meetups/MeetupGrid.svelte";

  let title = "";
  let subtitle = "";
  let address = "";
  let email = "";
  let description = "";
  let imageUrl = "";

  let meetups = [
    {
      id: "m1",
      title: "Coding Bootcamp",
      subtitle: "Learn code in 2 hours",
      description: "In this bootcamp, you will learn everything about code",
      imageUrl:
        "http://blog.hackerrank.com/wp-content/uploads/2014/08/Bootcamp.jpg",
      address: "27th Nerd Road, 1913LC Sevilla",
      contactEmail: "silvestre@hotmail.com"
    },
    {
      id: "m2",
      title: "Swim Bootcamp",
      subtitle: "Learn to swim in 2 hours",
      description: "In this course, you will learn to swim",
      imageUrl:
        "http://lahinchseaworld.com/wp-content/uploads/2013/07/swimming-lesson.jpg",
      address: "27th Nerd Road, 1913LC Castilleja",
      contactEmail: "swim@hotmail.com"
    }
  ];

  function addMeetup() {
    const newMeetup = {
      id: Math.random().toString(),
      title,
      subtitle,
      email,
      description,
      address,
      contactEmail: email
    };

    meetups = [...meetups, newMeetup];
  }
</script>

<style>
  main {
    margin-top: 5rem;
  }
</style>

<Header />

<main>
  <form on:submit|preventDefault={addMeetup}>
    <div class="form-control">
      <label for="title">Title</label>
      <input type="text" id="title" bind:value={title} />
    </div>
    <div class="form-control">
      <label for="subtitle">Subtitle</label>
      <input type="text" id="subtitle" bind:value={subtitle} />
    </div>
    <div class="form-control">
      <label for="address">Address</label>
      <input type="text" id="address" bind:value={address} />
    </div>
    <div class="form-control">
      <label for="image">ImageURL</label>
      <input type="text" id="image" bind:value={imageUrl} />
    </div>
    <div class="form-control">
      <label for="email">E-Mail</label>
      <input type="email" id="email" bind:value={email} />
    </div>
    <div class="form-control">
      <label for="description">Description</label>
      <textarea id="description" rows="3" bind:value={description} />
    </div>
    <button type="submit">Save</button>
  </form>
  <MeetupGrid {meetups} />
</main>
