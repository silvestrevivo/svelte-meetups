<script>
  import Header from "./UI/Header.svelte";
  import MeetupGrid from "./Meetups/MeetupGrid.svelte";

  const meetups = [
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
</script>

<style>
  main {
    margin-top: 5rem;
  }
</style>

<Header />

<main>
  <MeetupGrid {meetups} />
</main>
