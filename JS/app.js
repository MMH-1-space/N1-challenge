// ======================
// N1 Master App System
// ======================

const quizButtons =
    document.querySelectorAll(".quiz-btn");

const startBtn =
    document.getElementById("startBtn");

let selectedCategory = null;

// ----------------------
// カテゴリ選択
// ----------------------

quizButtons.forEach(button => {

    button.addEventListener("click", () => {

        // 選択状態リセット
        quizButtons.forEach(btn => {

            btn.style.background =
                "#e8f0ff";

            btn.style.color =
                "#333";

            btn.style.border =
                "none";

        });

        // 選択中表示
        button.style.background =
            "#2563eb";

        button.style.color =
            "white";

        button.style.border =
            "3px solid #1d4ed8";

        selectedCategory =
            button.dataset.category;

        localStorage.setItem(
            "selectedCategory",
            selectedCategory
        );

    });

});

// ----------------------
// 前回のカテゴリ復元
// ----------------------

const savedCategory =
    localStorage.getItem(
        "selectedCategory"
    );

if(savedCategory){

    selectedCategory =
        savedCategory;

    quizButtons.forEach(button => {

        if(
            button.dataset.category ===
            savedCategory
        ){

            button.style.background =
                "#2563eb";

            button.style.color =
                "white";

            button.style.border =
                "3px solid #1d4ed8";

        }

    });

}

// ----------------------
// 学習開始
// ----------------------

startBtn.addEventListener(
    "click",
    () => {

        if(!selectedCategory){

            alert(
                "カテゴリを選択してください"
            );

            return;

        }

        window.location.href =
            "quiz.html";

    }
);

// ----------------------
// ダブルクリックで即開始
// ----------------------

quizButtons.forEach(button => {

    button.addEventListener(
        "dblclick",
        () => {

            localStorage.setItem(
                "selectedCategory",
                button.dataset.category
            );

            window.location.href =
                "quiz.html";

        }
    );

});

// ----------------------
// ランダムクイズ処理
// ----------------------

function getRandomCategory(){

    const categories = [

        "vocabulary",
        "kanji",
        "grammar"

    ];

    return categories[
        Math.floor(
            Math.random() *
            categories.length
        )
    ];

}

// ランダム選択時
if(selectedCategory === "random"){

    const randomCategory =
        getRandomCategory();

    localStorage.setItem(
        "selectedCategory",
        randomCategory
    );

}
function startQuiz(category){
    localStorage.setItem("category", category);
    location.href = "quiz.html";
}
document.getElementById("homeBtn")?.addEventListener(
    "click",
    () => {
        location.href = "index.html";
    }
);
document.querySelector(
'[data-category="vocabulary"]'
)?.addEventListener(
"click",
()=>{
localStorage.setItem(
"selectedCategory",
"vocabulary"
);
}
);
document.querySelector(
'[data-category="kanji"]'
)?.addEventListener(
"click",
()=>{
localStorage.setItem(
"selectedCategory",
"kanji"
);
}
);
document.querySelector(
'[data-category="grammar"]'
)?.addEventListener(
"click",
()=>{
localStorage.setItem(
"selectedCategory",
"grammar"
);
}
);
function startQuiz(category){

    localStorage.setItem(
        "selectedCategory",
        category
    );

    location.href =
        "quiz.html";
}