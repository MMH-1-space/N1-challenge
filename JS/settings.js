// ======================================
// N1 Master Ver.2 Settings System
// ======================================

document.addEventListener("DOMContentLoaded", () => {

    const body = document.body;

    const lightBtn = document.getElementById("lightBtn");
    const darkBtn = document.getElementById("darkBtn");
    const resetBtn = document.getElementById("resetBtn");
    const questionCount = document.getElementById("questionCount");

    // -----------------------------
    // テーマ
    // -----------------------------

    const savedTheme =
        localStorage.getItem("theme") || "light";

    if (savedTheme === "dark") {
        body.classList.add("dark");
    }

    lightBtn.addEventListener("click", () => {

        body.classList.remove("dark");

        localStorage.setItem(
            "theme",
            "light"
        );

    });

    darkBtn.addEventListener("click", () => {

        body.classList.add("dark");

        localStorage.setItem(
            "theme",
            "dark"
        );

    });

    // -----------------------------
    // 出題数
    // -----------------------------

    questionCount.value =
        localStorage.getItem("questionCount") || "10";

    questionCount.addEventListener("change", () => {

        localStorage.setItem(
            "questionCount",
            questionCount.value
        );

    });

    // -----------------------------
    // データ初期化
    // -----------------------------

    resetBtn.addEventListener("click", () => {

        const ok = confirm(
            "学習データをすべて削除しますか？"
        );

        if (!ok) return;

        // 設定だけ残す
        const theme =
            localStorage.getItem("theme");

        const question =
            localStorage.getItem("questionCount");

        localStorage.clear();

        if (theme) {
            localStorage.setItem(
                "theme",
                theme
            );
        }

        if (question) {
            localStorage.setItem(
                "questionCount",
                question
            );
        }

        alert("学習データを初期化しました。");

        location.reload();

    });

    // -----------------------------
    // バージョン表示
    // -----------------------------

    console.log("N1 Master Ver.2");
});