import { supabase } from "./supabase";

const form = document.querySelector("form")!;

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(form);


  const { data, error, count, status, statusText } = await supabase
    .from('submissions')
    .insert(
      {
        name: formData.get("participant-name"),
        telegram_username: formData.get("participant-telegram-username"),
        project_name: formData.get("project-name"),
        project_github: formData.get("project-github"),
        project_details: formData.get("project-details"),
      },
    )
    .select();

  console.log("data", data);
  console.log("error", error);
  console.log("count", count);
  console.log("status", status);
  console.log("statusText", statusText);
});