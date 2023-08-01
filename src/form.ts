import confeti from "canvas-confetti";
import { supabase } from "./supabase";

const form = document.querySelector("form")!;
const status = document.querySelector("#status")! as HTMLParagraphElement;
const submitBtn = document.querySelector("#submit-btn")! as HTMLButtonElement;

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(form);

  submitBtn.textContent = "Submitting...";
  submitBtn.disabled = true;

  const { error } = await supabase
    .from('submissions')
    .insert(
      {
        name: formData.get("participant-name"),
        telegram_username: formData.get("participant-telegram-username"),
        project_name: formData.get("project-name"),
        project_github: formData.get("project-github"),
        project_details: formData.get("project-details"),
      },
    );

  submitBtn.textContent = "Submit";
  submitBtn.disabled = false;


  status.style.display = "block";
  if (error) {
    status.textContent = "Something went wrong. Reload the page and try again.";
    status.style.backgroundColor = "red";
  } else {
    confeti();
    form.reset();

    status.textContent = "Submitted successfully!";
    status.style.backgroundColor = "var(--green)";
  }
});
