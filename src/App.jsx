import preguntas from "./preguntas";
import { useState, useEffect } from "react";

function App() {
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [puntuación, setPuntuación] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [tiempoRestante, setTiempoRestante] = useState(10);
  const [areDisabled, setAreDisabled] = useState(false);
  const [answersShown, setAnswersShown] = useState(false);

  function handleAnswerSubmit(isCorrect, e) {
   
    if (isCorrect) setPuntuación(puntuación + 1);
    
    e.target.classList.add(isCorrect ? "correct" : "incorrect");


    setTimeout(() => {
      if (preguntaActual === preguntas.length - 1) {
        setIsFinished(true);
      } else {
        setPreguntaActual(preguntaActual + 1);
        
      }
    }, 1500);
  }



  if (isFinished)
    return (
      <main className="app">
        <div className="juego-terminado">
          <span>
            {" "}
            Obtuviste {puntuación} de {preguntas.length}{" "}
          </span>
          <button onClick={() => (window.location.href = "/")}>
            {" "}
            Volver a jugar
          </button>
          <button
            onClick={() => {
              setIsFinished(false);
              setAnswersShown(true);
              setPreguntaActual(0);
            }}
          >
            Ver respuestas
          </button>
        </div>
      </main>
    );

  if (answersShown)
    return (

      

      <main className="app">
        

        <div className="left-side">
          <div className="question-number">
            <span> Pregunta {preguntaActual + 1} de</span> {preguntas.length}
          </div>
          <div className="question-title">
            {preguntas[preguntaActual].titulo}
          </div>
          <div>
            {
              preguntas[preguntaActual].opciones.filter(
                (opcion) => opcion.isCorrect
              )[0].textoRespuesta
            }
          </div>
          <button
            onClick={() => {
              if (preguntaActual === preguntas.length - 1) {
                window.location.href = "/";
              } else {
                setPreguntaActual(preguntaActual + 1);
              }
            }}
          >
            {preguntaActual === preguntas.length - 1
              ? "Volver a jugar"
              : "Siguiente"}
          </button>
        </div>
      </main>
    );

  return (
   
    
    <main className="app">
      
      <div className="left-side">
        <div className="question-number">
          <span> Pregunta {preguntaActual + 1} de</span> {preguntas.length}
        </div>
        <div className="question-title">
          {preguntas[preguntaActual].titulo}
        </div>
        <div>
        
        </div>
      </div>
      <div className="right-side">
        {preguntas[preguntaActual].opciones.map((respuesta) => (
          <button
            disabled={areDisabled}
            key={respuesta.textoRespuesta}
            onClick={(e) => handleAnswerSubmit(respuesta.isCorrect, e)}
          >
            {respuesta.textoRespuesta}
          </button>
        ))}
      </div>
    </main>
    
  );
}

export default App;