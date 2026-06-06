
let point = 0;
let quizdata = null;
let currentIndex = 0; // 👈 FALTABA ESTO
let total = 0;

function crear_contenido(){
    console.log("pagina cargada");
    document.getElementById("question").innerHTML = "<h2>Cual es el elemento natural del hierro</h2>";
};


function load_content(){
        fetch("./data.json")
        .then(res => res.json())
        .then(data => {

        // 🔀 mezclar preguntas del JSON externo
        let preguntas = data.preguntas.sort(() => Math.random() - 0.5);
        // ✂️ tomar 20 (o menos si no hay suficientes)
        const limit = Math.min(20, preguntas.length);
        preguntas = preguntas.slice(0, limit);


        quizdata = {
            titulo: "Quiz de Ciencias",
            preguntas: preguntas.map((item, index) => ({
                id: index + 1,
                pregunta: item.question,
                opciones: [item.A, item.B, item.C, item.D],
                respuesta_correcta: item[item.answer]
            }))
        };


        currentIndex = 0;

        render_question(quizdata);
        render_option();
        })
    .catch(error=>console.error("Error:",error))


}


function render_question(){

    document.getElementById("question")
    .innerHTML = `<h2> ${quizdata.preguntas[currentIndex].pregunta} </h2>`;

}

function render_option() {
    const container = document.getElementById("r-container");
    container.innerHTML = ""; // Limpiar botones anteriores

    const responses = quizdata.preguntas[currentIndex].opciones;
    console.log(responses)

    responses.forEach(resp => {
        const button = document.createElement("button");
        button.classList.add("option"); // clase correcta
        button.value = resp;
        button.textContent = resp;

        // 🔥 Agregar evento al botón
        button.addEventListener("click", function () {
            send_response(this.value);
        });

        container.appendChild(button);
    });
}



function send_response(resp) {
    const correcta = quizdata.preguntas[currentIndex].respuesta_correcta;
    const botones = document.querySelectorAll(".option");

    botones.forEach(btn => {
        btn.classList.add("disabled"); // bloquear clicks

        const valor = btn.value;

        if (valor === correcta) {
            btn.classList.add("correcta");
        } else {
            btn.classList.add("incorrecta"); // todas las demás rojas
        }
    });

    if (resp === correcta) {
        point++;
        console.log("Correcto:", point);
    } else {
        console.log("Incorrecto");
    }
    document.getElementById("next-container")
    .innerHTML = "<button id='next' onclick=nextQuestion()>Next</button>"
}
window.nextQuestion = function (){

    console.log(quizdata.preguntas.length,currentIndex, total)
    let passed = false;
    
    if(currentIndex  == total - 1){

        if (point == total) {
                document.getElementById("question").innerHTML =
            `<h1 class="title">Quiz Completed 🎉</h1>
            <p class="subtitle">Great job!</p>`;
            passed = true;
        }else{
            document.getElementById("question").innerHTML =
            `<h1 class="title-bad">Quiz Failed!</h1>
            <p class="subtitle">Try Again</p>`;

        }

        if (passed == false){
            document.getElementById("r-container").innerHTML =
        `<div class="result-bad">
            <h2>${point} / ${total}</h2>
            <p>Your score</p>
        </div>`;


         
        }else{ 
            document.getElementById("r-container").innerHTML =
        `<div class="result">
            <h2>${point} / ${total}</h2>
            <p>Your score</p>
        </div>`;
        }
        document.getElementById("next-container").innerHTML =
    `<button id="tryBtn" class="try-btn" onclick=resetQuiz()>Try Again</button>`;
        console.log("Completed");
    }else{
        currentIndex += 1;
        render_question(quizdata)
        render_option()
    }

}

window.resetQuiz = function() {
    point = 0;
    currentIndex = 0;

    // Limpiar contenedores
    document.getElementById("question").innerHTML = "";
    document.getElementById("r-container").innerHTML = "";

    // Volver a mostrar la primera pregunta
    render_question();
    render_option();
}

window.onload = function () {

    console.log("pagina cargada")
    crear_contenido();
    load_content();

};