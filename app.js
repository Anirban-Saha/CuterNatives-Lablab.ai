const sign_in_btn = document.querySelector("#try-again");
const sign_up_btn = document.querySelector(".btn-solid");
const container = document.querySelector(".container");
const input_textfield = document.getElementById('start_word');
const output_textarea = document.getElementById('response_output');
const NOT_API_KEY = atob(atob(atob(atob(atob("VmxaamVGWXlSa2hVYmxKWFltMTRTMVZzVW5OVU1YQkdXWHBHYVZKdVFUSldiVFZ2WWtkR2NtSkVVbFpoTVZwUVZsZDRUMU5XVW5GWGJGSk9VakZLU1Zac1VrZFNNbFpYWTBWV1YySnNXbGxXYkZKWFUyeGtjbGR1WkU5aVZscDVWbGR6TlZReFpFZFRhMVpWWVd0S2RWVkdSVGxRVVQwOQ==")))))
const generations = 3

continueTyping = false

sign_up_btn.addEventListener("click", () => {
  prompt = input_textfield.value.trim()
  if(prompt.length == 0){
    alert("Please enter a starting prompt to proceed")
    return;
  }
  output_textarea.value = prompt
  continueTyping = true
  generate(prompt)
  container.classList.add("response-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("response-mode");
  continueTyping = false
  input_textfield.value = ""
  output_textarea.value = ""
});

function generate(prompt){
  if(!continueTyping)
    return

  url = 'https://api.cohere.ai/generate'

  const options = {
    method: 'POST',
    headers: {
        accept: 'application/json',
        'Cohere-Version': '2022-12-06',
        'content-type': 'application/json',
        authorization: NOT_API_KEY,
    },
    body: JSON.stringify({
        prompt: prompt,
        num_generations: generations,
    }),
    };

  fetch(url, options)
  .then(response => response.json())
  .then(data => {
    console.clear()
    textBack = data['generations'][Math.floor(Math.random()*generations)]['text']
    output_textarea.value += textBack
    prompt = textBack
    // prompt = textBack.split(" ")
    // prompt = prompt[prompt.length - 1]
    generate(prompt)
  })
}