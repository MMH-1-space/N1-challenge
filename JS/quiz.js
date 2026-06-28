// ==========================
// N1 Master Ver.2 Quiz System
// ==========================

let category = localStorage.getItem("selectedCategory") || "random";


// ランダムカテゴリ
if (category === "random" || !questions[category]) {
    const categories = ["vocabulary", "kanji", "grammar"];
    category = categories[Math.floor(Math.random() * categories.length)];
}

// HTML取得
const categoryTitle = document.getElementById("categoryTitle");
const questionElement = document.getElementById("question");
const choicesElement = document.getElementById("choices");
const progressElement = document.getElementById("progress");
const progressFill = document.getElementById("progressFill");
const scoreText = document.getElementById("scoreText");
const explanation = document.getElementById("explanation");
const nextBtn = document.getElementById("nextBtn");

// カテゴリタイトル
const categoryNames = {
    vocabulary: "📚 語彙クイズ",
    kanji: "🈶 漢字クイズ",
    grammar: "📝 文法クイズ"
};

categoryTitle.textContent = categoryNames[category] || "🎲 ランダムクイズ";

// 問題取得
let questionList = [...questions[category]];

// 問題シャッフル
questionList.sort(() => Math.random() - 0.5);

// 出題数
const questionCount =
    Number(localStorage.getItem("questionCount")) || 10;

questionList = questionList.slice(
    0,
    Math.min(questionCount, questionList.length)
);

let currentQuestionIndex = 0;
let score = 0;
let answered = false;

// 問題がない場合
if (questionList.length === 0) {
    questionElement.textContent = "問題データがありません。";
    choicesElement.innerHTML =
        "<p>vocabulary.js / kanji.js / grammar.js を確認してください。</p>";
}

// ==========================
// 問題表示
// ==========================

function showQuestion() {

    answered = false;

    const q = questionList[currentQuestionIndex];

    progressElement.textContent =
        `問題 ${currentQuestionIndex + 1} / ${questionList.length}`;

    progressFill.style.width =
        `${((currentQuestionIndex + 1) / questionList.length) * 100}%`;

    scoreText.textContent = `Score : ${score}`;

    questionElement.textContent = q.question;

    choicesElement.innerHTML = "";

    explanation.classList.add("hidden");
    explanation.innerHTML = "";

    nextBtn.classList.add("hidden");

    // 選択肢シャッフル
    const shuffledChoices = q.choices.map((choice, index) => {
        return {
            text: choice,
            originalIndex: index
        };
    });

    shuffledChoices.sort(() => Math.random() - 0.5);

    shuffledChoices.forEach((choiceObj) => {

        const btn = document.createElement("button");

        btn.className = "choice-btn";
        btn.textContent = choiceObj.text;

        btn.onclick = () => {
            checkAnswer(choiceObj.originalIndex);
        };

        choicesElement.appendChild(btn);
    });
}

// ==========================
// 回答判定
// ==========================

function checkAnswer(selectedIndex) {

    if (answered) {
        return;
    }

    answered = true;

    const q = questionList[currentQuestionIndex];

    const buttons = document.querySelectorAll(".choice-btn");

    buttons.forEach((btn) => {
        btn.disabled = true;

        if (btn.textContent === q.choices[q.answer]) {
            btn.classList.add("correct");
        }

        if (
            selectedIndex !== q.answer &&
            btn.textContent === q.choices[selectedIndex]
        ) {
            btn.classList.add("wrong");
        }
    });

    if (selectedIndex === q.answer) {
        score++;
    }

    scoreText.textContent = `Score : ${score}`;

    explanation.classList.remove("hidden");

    if (selectedIndex === q.answer) {
        explanation.innerHTML = `
            <h3>⭕ 正解</h3>
            <p>${q.explanation || "解説はありません。"}</p>
        `;
    } else {
        explanation.innerHTML = `
            <h3>❌ 不正解</h3>
            <p><strong>正解：</strong>${q.choices[q.answer]}</p>
            <p>${q.explanation || "解説はありません。"}</p>
        `;
    }

    nextBtn.classList.remove("hidden");

    if (currentQuestionIndex === questionList.length - 1) {
        nextBtn.textContent = "結果を見る";
    } else {
        nextBtn.textContent = "次の問題へ";
    }
}

// ==========================
// 次の問題
// ==========================

function nextQuestion() {

    currentQuestionIndex++;

    if (currentQuestionIndex < questionList.length) {
        showQuestion();
    } else {
        finishQuiz();
    }
}

// ==========================
// 終了処理
// ==========================

function finishQuiz() {

    const total = questionList.length;

    localStorage.setItem("score", score);
    localStorage.setItem("totalQuestions", total);
    localStorage.setItem("lastCategory", category);

    // 最高得点
    const bestScore = Number(localStorage.getItem("bestScore")) || 0;

    if (score > bestScore) {
        localStorage.setItem("bestScore", score);
    }

    // プレイ回数
    const playCount = Number(localStorage.getItem("playCount")) || 0;
    localStorage.setItem("playCount", playCount + 1);

    // 正答率
    const rate = Math.round((score / total) * 100);
    localStorage.setItem("correctRate", rate);

    window.location.href = "result.html";
}

// 次へボタン
nextBtn.addEventListener("click", nextQuestion);

// 開始
if (questionList.length > 0) {
    showQuestion();
}