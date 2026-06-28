// ======================
// N1 Master Ver.2 Result System
// ======================

const score = Number(localStorage.getItem("score")) || 0;
const totalQuestions = Number(localStorage.getItem("totalQuestions")) || 10;
const category = localStorage.getItem("lastCategory") || localStorage.getItem("selectedCategory") || "random";

const rate =
    totalQuestions > 0
        ? Math.round((score / totalQuestions) * 100)
        : 0;

// ランク判定
let rank = "";

if (rate === 100) {
    rank = "S";
} else if (rate >= 90) {
    rank = "A";
} else if (rate >= 80) {
    rank = "B";
} else if (rate >= 70) {
    rank = "C";
} else if (rate >= 60) {
    rank = "D";
} else {
    rank = "E";
}

// カテゴリ名
const categoryNames = {
    vocabulary: "📚 語彙",
    kanji: "🈶 漢字",
    grammar: "📝 文法",
    random: "🎲 ランダム"
};

const categoryName = categoryNames[category] || "N1クイズ";

// メッセージ
let message = "";

if (rank === "S") {
    message = "素晴らしい！N1レベルです！";
} else if (rank === "A") {
    message = "かなり理解できています！";
} else if (rank === "B") {
    message = "合格圏内です！";
} else if (rank === "C") {
    message = "もう少し復習しましょう。";
} else {
    message = "基礎から復習しましょう。";
}

// 保存データ取得
const bestScore = Number(localStorage.getItem("bestScore")) || 0;
const playCount = Number(localStorage.getItem("playCount")) || 0;

// 画面表示
document.getElementById("scoreText").textContent =
    `${score} / ${totalQuestions} 点`;

document.getElementById("rateText").textContent =
    `正答率 ${rate}%`;

document.getElementById("rankText").textContent =
    `ランク ${rank}`;

document.getElementById("categoryText").textContent =
    `カテゴリ ${categoryName}`;

document.getElementById("bestScore").textContent =
    `最高得点 ${bestScore} 点`;

document.getElementById("playCount").textContent =
    `プレイ回数 ${playCount}回`;

// メッセージ追加
const resultCard = document.querySelector(".result-card");

const messageElement = document.createElement("h3");
messageElement.textContent = message;
messageElement.style.marginTop = "18px";
messageElement.style.color = "#2563eb";

resultCard.appendChild(messageElement);