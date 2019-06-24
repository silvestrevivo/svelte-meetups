<script>
  import { createEventDispatcher } from "svelte";
  import TextInput from "../UI/TextInput.svelte";
  import Button from "../UI/Button.svelte";
  import Modal from "../UI/Modal.svelte";
  import { notEmpty, isValidEmail } from "../helpers/validation";

  let title = "";
  let subtitle = "";
  let address = "";
  let email = "";
  let description = "";
  let imageUrl = "";

  const dispatch = createEventDispatcher();

  $: titleValid = !notEmpty(title);
  $: subtitleValid = !notEmpty(subtitle);
  $: addressValid = !notEmpty(address);
  $: descriptionValid = !notEmpty(description);
  $: imageUrlValid = !notEmpty(imageUrl);
  $: emailValid = isValidEmail(email);
  $: formIsValid =
    titleValid &&
    subtitleValid &&
    addressValid &&
    descriptionValid &&
    imageUrlValid &&
    emailValid;

  function submitForm() {
    dispatch("save", {
      title,
      subtitle,
      address,
      email,
      description,
      imageUrl
    });
  }

  function cancel() {
    dispatch("cancel");
  }
</script>

<style>
  form {
    width: 100%;
  }
</style>

<Modal title="Edit Meetup Data" on:cancel>
  <form on:submit|preventDefault={submitForm}>
    <TextInput
      id="title"
      label="Title"
      valid={titleValid}
      validityMessage="Please enter a valid title"
      value={title}
      on:input={event => (title = event.target.value)} />
    <TextInput
      id="subtitle"
      label="Subtitle"
      valid={subtitleValid}
      validityMessage="Please enter a valid subtitle"
      value={subtitle}
      on:input={event => (subtitle = event.target.value)} />
    <TextInput
      id="address"
      label="Address"
      valid={addressValid}
      validityMessage="Please enter a valid address"
      value={address}
      on:input={event => (address = event.target.value)} />
    <TextInput
      id="imageUrl"
      label="ImageUrl"
      valid={imageUrlValid}
      validityMessage="Please enter a valid image url"
      value={imageUrl}
      on:input={event => (imageUrl = event.target.value)} />
    <TextInput
      id="email"
      label="Email"
      valid={emailValid}
      validityMessage="Please enter a valid email"
      type="email"
      value={email}
      on:input={event => (email = event.target.value)} />
    <TextInput
      controlType="textarea"
      id="description"
      label="Description"
      valid={descriptionValid}
      validityMessage="Please enter a valid description"
      rows="3"
      bind:value={description} />
  </form>
  <div slot="footer">
    <Button type="button" on:click={cancel}>Cancel</Button>
    <Button
      type="button"
      mode="outline"
      on:click={submitForm}
      disabled={!formIsValid}>
      Save
    </Button>
  </div>
</Modal>
