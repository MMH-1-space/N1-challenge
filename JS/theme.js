// ======================================
// N1 Master Ver.2 Theme System
// ======================================

document.addEventListener("DOMContentLoaded", () => {

    applyTheme();

});

// --------------------------
// テーマ適用
// --------------------------

function applyTheme() {

    const theme =
        localStorage.getItem("theme") || "light";

    if (theme === "dark") {

        document.body.classList.add("dark");

    } else {

        document.body.classList.remove("dark");

    }

}

// --------------------------
// ダークモードON
// --------------------------

function enableDarkMode() {

    document.body.classList.add("dark");

    localStorage.setItem(
        "theme",
        "dark"
    );

}

// --------------------------
// ライトモードON
// --------------------------

function disableDarkMode() {

    document.body.classList.remove("dark");

    localStorage.setItem(
        "theme",
        "light"
    );

}

// --------------------------
// テーマ切替
// --------------------------

function toggleTheme() {

    if (
        document.body.classList.contains("dark")
    ) {

        disableDarkMode();

    } else {

        enableDarkMode();

    }

}

// --------------------------
// 現在のテーマ取得
// --------------------------

function getCurrentTheme() {

    return (
        localStorage.getItem("theme")
        || "light"
    );

}

// --------------------------
// 初回設定
// --------------------------

if (!localStorage.getItem("theme")) {

    localStorage.setItem(
        "theme",
        "light"
    );

}