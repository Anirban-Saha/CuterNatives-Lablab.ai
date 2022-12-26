const sign_in_btn = document.querySelector("#try-again");
const sign_up_btn = document.querySelector(".btn-solid");
const container = document.querySelector(".container");
const input_textfield = document.getElementById('start_word');
const output_textarea = document.getElementById('response_output');

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
        authorization: 'Bearer OMtneg5qz21DCQHszKGFSQrd5nYNHdZzzDN5tC7H'
    },
    body: JSON.stringify({
        prompt: prompt
    }),
    };

  fetch(url, options)
  .then(response => response.json())
  .then(data => {
    textBack = data['generations'][0]['text']
    output_textarea.value += textBack
    prompt = textBack.split(" ")
    prompt = prompt[prompt.length - 1]
    generate(prompt)
  })
}