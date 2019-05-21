<script>
  import Header from "./UI/Header.svelte";
  import MeetupGrid from "./Meetups/MeetupGrid.svelte";
  import TextInput from "./UI/TextInput.svelte";
  import Button from "./UI/Button.svelte";

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

  form {
    width: 30rem;
    max-width: 90%;
    margin: auto;
  }
</style>

<Header />
<main>
  <form on:submit|preventDefault={addMeetup}>
    <TextInput
      id="title"
      label="Title"
      value={title}
      on:input={event => (title = event.target.value)} />
    <TextInput
      id="subtitle"
      label="Subtitle"
      value={subtitle}
      on:input={event => (subtitle = event.target.value)} />
    <TextInput
      id="address"
      label="Address"
      value={address}
      on:input={event => (address = event.target.value)} />
    <TextInput
      id="imageUrl"
      label="ImageUrl"
      value={imageUrl}
      on:input={event => (imageUrl = event.target.value)} />
    <TextInput
      id="email"
      label="Email"
      type="email"
      value={email}
      on:input={event => (email = event.target.value)} />
    <TextInput
      controlType="textarea"
      id="description"
      label="Description"
      rows="3"
      value={description}
      on:input={event => (description = event.target.value)} />
    <Button type="submit" caption="Save" />
  </form>
  <MeetupGrid {meetups} />
</main>
