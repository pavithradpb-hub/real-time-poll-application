function createPoll() {
    let question = document.getElementById("question").value;
    let opt1 = document.getElementById("option1").value;
    let opt2 = document.getElementById("option2").value;

    if (!question || !opt1 || !opt2) return;

    let poll = document.createElement("div");
    poll.className = "poll";

    poll.innerHTML = `
        <h3>${question}</h3>

        <div class="option" onclick="vote(this, 0)">
            ${opt1}
            <div class="bar" style="width:0%"></div>
        </div>

        <div class="option" onclick="vote(this, 1)">
            ${opt2}
            <div class="bar" style="width:0%"></div>
        </div>
    `;

    poll.dataset.votes = JSON.stringify([0, 0]);

    document.getElementById("poll-container").prepend(poll);

    document.getElementById("question").value = "";
    document.getElementById("option1").value = "";
    document.getElementById("option2").value = "";
}

function vote(optionEl, index) {
    let poll = optionEl.parentElement;
    let votes = JSON.parse(poll.dataset.votes);

    votes[index]++;

    poll.dataset.votes = JSON.stringify(votes);

    updatePoll(poll);
}

function updatePoll(poll) {
    let votes = JSON.parse(poll.dataset.votes);
    let total = votes.reduce((a, b) => a + b, 0);

    let options = poll.querySelectorAll(".option");

    options.forEach((opt, i) => {
        let percent = total === 0 ? 0 : (votes[i] / total) * 100;
        opt.querySelector(".bar").style.width = percent + "%";
    });
}