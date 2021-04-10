flag = 0;
document.addEventListener("DOMContentLoaded", () => {
  const inputField = document.getElementById("input");
  inputField.addEventListener("keyup", (e) => {
    if (e.keyCode === 13) {
      var input = inputField.value;
      inputField.value = "";
      if (input != "") {
        output(input);
      }
    }
  });
});

function output(input) {
  let product;
  let text = input
    .toLowerCase()
    .replace(/[^\w\s]/gi, "")
    .replace(/[\d]/gi, "")
    .trim();
  text = text
    .replace(/ a /g, " ")
    .replace(/i feel /g, "")
    .replace(/whats/g, "what is")
    .replace(/please /g, "")
    .replace(/ please/g, "")
    .replace(/r u/g, "are you");
  if (flag <= 3 && compare(prompts, replies, text)) {
    product = compare(prompts, replies, text);
  } else if (text.match(/thank/gi)) {
    product = "You're welcome!";
  } else if (text.match(/(corona|covid|virus)/gi)) {
    product = coronavirus[Math.floor(Math.random() * coronavirus.length)];
  } else {
    product = alternative[Math.floor(Math.random() * alternative.length)];
  }
  if (flag <= 2) flag = flag + 1;
  else {
    product = "Thanks for visiting our website!";
    flag = 0;
  }

  addChat(input, product);
}

function compare(promptsArray, repliesArray, string) {
  let reply;
  let x = flag;
  let y;
  if (x == 0) {
    reply = repliesArray[0][0];
  } else {
    for (y = 0; y < promptsArray[x].length; y++) {
      if (promptsArray[x][y] === string) {
        reply = repliesArray[x][y];
        break;
      }
    }
  }
  return reply;
}

function addChat(input, product) {
  const messagesContainer = document.getElementById("messages");

  let userDiv = document.createElement("div");
  userDiv.id = "user";
  userDiv.className = "user response";
  userDiv.innerHTML = `<img src="/img/user.png" class="avatar"><span>${input}</span>`;
  messagesContainer.appendChild(userDiv);

  let botDiv = document.createElement("div");
  let botImg = document.createElement("img");
  let botText = document.createElement("span");
  botDiv.id = "bot";
  botImg.src = "/img/bot-mini.png";
  botImg.className = "avatar";
  botDiv.className = "bot response";
  botText.innerText = "Typing...";
  botDiv.appendChild(botText);
  botDiv.appendChild(botImg);
  messagesContainer.appendChild(botDiv);

  messagesContainer.scrollTop =
    messagesContainer.scrollHeight - messagesContainer.clientHeight;

  setTimeout(() => {
    botText.innerText = `${product}`;
    textToSpeech(product);
  }, 2000);
}
